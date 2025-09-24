"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreinadorModule = void 0;
const common_1 = require("@nestjs/common");
const treinador_service_1 = require("./treinador.service");
const treinador_controller_1 = require("./treinador.controller");
const match_decorator_1 = require("../../utils/match.decorator");
const encrypt_service_1 = require("../../utils/encrypt/encrypt.service");
const mongoose_1 = require("@nestjs/mongoose");
const treinador_schema_1 = require("./schema/treinador.schema");
let TreinadorModule = class TreinadorModule {
};
exports.TreinadorModule = TreinadorModule;
exports.TreinadorModule = TreinadorModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: treinador_schema_1.Treinador.name, schema: treinador_schema_1.TreinadorSchema }])],
        controllers: [treinador_controller_1.TreinadorController],
        providers: [treinador_service_1.TreinadorService, match_decorator_1.Match, encrypt_service_1.EncryptService],
        exports: [treinador_service_1.TreinadorService, encrypt_service_1.EncryptService],
    })
], TreinadorModule);
