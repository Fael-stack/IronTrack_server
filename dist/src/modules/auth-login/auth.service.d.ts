import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { EncryptService } from 'src/utils/encrypt/encrypt.service';
export declare class LoginJwtService {
    private readonly jwtService;
    private readonly encryptService;
    private readonly userSchema;
    private readonly refreshTokenSchema;
    constructor(jwtService: JwtService, encryptService: EncryptService, userSchema: Model<UserSchema>, refreshTokenSchema: Model<RefreshTokenSchema>);
    login(email: string, senha: string, lembrar: boolean): Promise<{
        token: string;
        refreshToken: string;
    }>;
    refreshTokens(oldRefreshToken: string): Promise<{
        token: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<void>;
}
