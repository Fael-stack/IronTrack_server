"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let EncryptService = class EncryptService {
    constructor() {
        this.saltRounds = 10;
    }
    async encrypt(password) {
        const salt = await bcryptjs_1.default.genSalt(this.saltRounds);
        return await bcryptjs_1.default.hash(password, salt);
    }
    async comparePasswords(plainPassword, hashedPassword) {
        return await bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
    async createUser(senha, confirmarSenha) {
        if (senha !== confirmarSenha) {
            throw new Error('As senhas não coincidem!');
        }
        const hashedPassword = await this.encrypt(senha);
        return { mensagem: 'Usuário criado com sucesso!', senhaCriptografada: hashedPassword };
    }
};
exports.EncryptService = EncryptService;
exports.EncryptService = EncryptService = __decorate([
    (0, common_1.Injectable)()
], EncryptService);
