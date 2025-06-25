"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const alimento_module_1 = require("./modules/alimento/alimento.module");
const dieta_module_1 = require("./modules/dieta/dieta.module");
const auth_module_1 = require("./modules/auth-login/auth.module");
const exercicio_module_1 = require("./modules/exercicio/exercicio.module");
const treinador_module_1 = require("./modules/treinador/treinador.module");
const treino_module_1 = require("./modules/treino/treino.module");
const user_module_1 = require("./modules/user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    uri: configService.get('MONGO_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            alimento_module_1.AlimentoModule,
            dieta_module_1.DietaModule,
            auth_module_1.AuthModule,
            exercicio_module_1.ExercicioModule,
            treinador_module_1.TreinadorModule,
            treino_module_1.TreinoModule,
            user_module_1.UserModule,
        ],
    })
], AppModule);
