import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/schema/user.schema';
import { EncryptService } from 'src/utils/encrypt/encrypt.service';
import { RefreshToken, RefreshTokenDocument } from 'src/modules/RefreshToken/RefreshToken.schema';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly encryptService: EncryptService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  async login(
    email: string,
    senha: string,
    lembrar: boolean,
    codigo: boolean,
  ): Promise<{ token: string; refreshToken: string }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Email não encontrado');
    }

    const senhaValidate = await this.encryptService.comparePasswords(
      senha,
      user.senha,
    );
    if (!senhaValidate) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = {
      id: user._id,
      email: user.email,
      nome: user.nome,
      senha: user.senha,
      
      // adicione mais propriedades se quiser, como 'usuario', 'curso', etc, se definidas no schema
    };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    const refreshTokenValue = crypto.randomBytes(64).toString('hex');
    const refreshTokenExpiresInMs = lembrar
      ? 30 * 24 * 60 * 60 * 1000
      : 1 * 24 * 60 * 60 * 1000;
    const refreshTokenExpiresAt = new Date(Date.now() + refreshTokenExpiresInMs);

    const newRefreshToken = new this.refreshTokenModel({
      longToken: refreshTokenValue,
      userId: user._id,
      expiresAt: refreshTokenExpiresAt,
      revoked: false,
    });
    await newRefreshToken.save();

    return { token, refreshToken: refreshTokenValue };
  }

  async refreshTokens(
    oldRefreshToken: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const foundToken = await this.refreshTokenModel
      .findOne({ longToken: oldRefreshToken, revoked: false })
      .exec();

    if (!foundToken || foundToken.expiresAt < new Date()) {
      if (foundToken && foundToken.expiresAt < new Date() && !foundToken.revoked) {
        foundToken.revoked = true;
        await foundToken.save();
      }
      throw new UnauthorizedException(
        'Refresh token inválido ou expirado. Por favor, faça login novamente.',
      );
    }

    foundToken.revoked = true;
    await foundToken.save();

    const user = await this.userModel.findById(foundToken.userId).exec();
    if (!user) {
      throw new UnauthorizedException(
        'Usuário associado ao refresh token não encontrado.',
      );
    }

    const payload = {
      id: user._id,
      email: user.email,
      nome: user.nome,
      senha: user.senha,
      // adicione mais propriedades se quiser
    };

    const newToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    const newRefreshTokenValue = crypto.randomBytes(64).toString('hex');
    const newRefreshTokenExpiresAt = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    );

    const brandNewRefreshToken = new this.refreshTokenModel({
      longToken: newRefreshTokenValue,
      userId: user._id,
      expiresAt: newRefreshTokenExpiresAt,
      revoked: false,
    });
    await brandNewRefreshToken.save();

    return { token: newToken, refreshToken: newRefreshTokenValue };
  }

  async logout(refreshToken: string): Promise<void> {
    const result = await this.refreshTokenModel
      .findOneAndUpdate(
        { longToken: refreshToken, revoked: false },
        { $set: { revoked: true } },
        { new: true },
      )
      .exec();

    if (!result) {
      console.warn('Logout: Refresh token não encontrado ou já revogado.');
    }
  }
}
