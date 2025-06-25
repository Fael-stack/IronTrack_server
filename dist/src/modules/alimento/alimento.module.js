"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlimentoModule = void 0;
const common_1 = require("@nestjs/common");
const alimento_service_1 = require("./alimento.service");
const alimento_controller_1 = require("./alimento.controller");
const match_decorator_1 = require("../../utils/match.decorator");
const encrypt_service_1 = require("../../utils/encrypt/encrypt.service");
const mongoose_1 = require("@nestjs/mongoose");
const alimento_schema_1 = require("./schema/alimento.schema");
let AlimentoModule = class AlimentoModule {
};
exports.AlimentoModule = AlimentoModule;
exports.AlimentoModule = AlimentoModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: alimento_schema_1.Alimento.name, schema: alimento_schema_1.AlimentoSchema }])],
        controllers: [alimento_controller_1.AlimentoController],
        providers: [alimento_service_1.AlimentoService, match_decorator_1.Match, encrypt_service_1.EncryptService],
        exports: [alimento_service_1.AlimentoService, encrypt_service_1.EncryptService],
    })
], AlimentoModule);
