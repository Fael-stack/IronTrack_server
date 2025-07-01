"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginJwtService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const encrypt_service_1 = require("../../utils/encrypt/encrypt.service");
const crypto = __importStar(require("crypto"));
let LoginJwtService = class LoginJwtService {
    constructor(jwtService, encryptService, userSchema, refreshTokenSchema) {
        this.jwtService = jwtService;
        this.encryptService = encryptService;
        this.userSchema = userSchema;
        this.refreshTokenSchema = refreshTokenSchema;
    }
    async login(email, senha, lembrar) {
        const user = await this.usersSchema.findOne({ email }).exec();
        if (!user) {
            throw new common_1.UnauthorizedException('Email não encontrado');
        }
        const senhaValidate = await this.encryptService.comparePasswords(senha, user.senha);
        if (!senhaValidate) {
            throw new common_1.UnauthorizedException('Senha incorreta');
        }
        const payload = {
            id: user._id,
            email: user.email,
            nome: user.nome,
            senha: user.senha,
            usuario: user.usuario,
        };
        const token = this.jwtService.sign(payload, { expiresIn: '1h' });
        const refreshTokenValue = crypto.randomBytes(64).toString('hex');
        const refreshTokenExpiresInMs = lembrar
            ? 30 * 24 * 60 * 60 * 1000
            : 1 * 24 * 60 * 60 * 1000;
        const refreshTokenExpiresAt = new Date(Date.now() + refreshTokenExpiresInMs);
        const newRefreshToken = new this.refreshTokenSchema({
            longToken: refreshTokenValue,
            userId: user._id,
            expiresAt: refreshTokenExpiresAt,
            revoked: false,
        });
        await newRefreshToken.save();
        return { token, refreshToken: refreshTokenValue };
    }
    async refreshTokens(oldRefreshToken) {
        const foundToken = await this.refreshTokenSchema
            .findOne({ longToken: oldRefreshToken, revoked: false })
            .exec();
        if (!foundToken || foundToken.expiresAt < new Date()) {
            if (foundToken &&
                foundToken.expiresAt < new Date() &&
                !foundToken.revoked) {
                foundToken.revoked = true;
                await foundToken.save();
            }
            throw new common_1.UnauthorizedException('Refresh token inválido ou expirado. Por favor, faça login novamente.');
        }
        foundToken.revoked = true;
        await foundToken.save();
        const user = await this.usersSchema
            .findById(foundToken.userId)
            .exec();
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário associado ao refresh token não encontrado.');
        }
        const payload = {
            id: user._id,
            email: user.email,
            nome: user.nome,
            curso: user.curso,
            usuario: user.usuario
        };
        const newToken = this.jwtService.sign(payload, { expiresIn: '1h' });
        const newRefreshTokenValue = crypto.randomBytes(64).toString('hex');
        const newRefreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const brandNewRefreshToken = new this.refreshTokenSchema({
            longToken: newRefreshTokenValue,
            userId: user._id,
            expiresAt: newRefreshTokenExpiresAt,
            revoked: false,
        });
        await brandNewRefreshToken.save();
        return { token: newToken, refreshToken: newRefreshTokenValue };
    }
    async logout(refreshToken) {
        const result = await this.refreshTokenSchema
            .findOneAndUpdate({ longToken: refreshToken, revoked: false }, { $set: { revoked: true } }, { new: true })
            .exec();
        if (!result) {
            console.warn('Logout: Refresh token não encontrado ou já revogado.');
        }
    }
};
exports.LoginJwtService = LoginJwtService;
exports.LoginJwtService = LoginJwtService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(Tokenref.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        encrypt_service_1.EncryptService,
        mongoose_2.Model,
        mongoose_2.Model])
], LoginJwtService);
