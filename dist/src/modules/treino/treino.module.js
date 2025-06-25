"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreinoModule = void 0;
const common_1 = require("@nestjs/common");
const treino_service_1 = require("./treino.service");
const treino_controller_1 = require("./treino.controller");
const match_decorator_1 = require("../../utils/match.decorator");
const encrypt_service_1 = require("../../utils/encrypt/encrypt.service");
const mongoose_1 = require("@nestjs/mongoose");
const treino_schema_1 = require("./schema/treino.schema");
let TreinoModule = class TreinoModule {
};
exports.TreinoModule = TreinoModule;
exports.TreinoModule = TreinoModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: treino_schema_1.Treino.name, schema: treino_schema_1.TreinoSchema }])],
        controllers: [treino_controller_1.TreinoController],
        providers: [treino_service_1.TreinoService, match_decorator_1.Match, encrypt_service_1.EncryptService],
        exports: [treino_service_1.TreinoService, encrypt_service_1.EncryptService],
    })
], TreinoModule);
