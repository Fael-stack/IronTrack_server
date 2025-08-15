import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserDocument } from 'src/modules/user/schema/user.schema';
import { EncryptService } from 'src/utils/encrypt/encrypt.service';
import { RefreshTokenDocument } from 'src/modules/RefreshToken/RefreshToken.schema';
export declare class AuthService {
    private readonly jwtService;
    private readonly encryptService;
    private readonly userModel;
    private readonly refreshTokenModel;
    constructor(jwtService: JwtService, encryptService: EncryptService, userModel: Model<UserDocument>, refreshTokenModel: Model<RefreshTokenDocument>);
    login(email: string, senha: string, lembrar: boolean, codigo: boolean): Promise<{
        token: string;
        refreshToken: string;
    }>;
    refreshTokens(oldRefreshToken: string): Promise<{
        token: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<void>;
}
