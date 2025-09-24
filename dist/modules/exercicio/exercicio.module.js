"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercicioModule = void 0;
const common_1 = require("@nestjs/common");
const exercicio_service_1 = require("./exercicio.service");
const exercicio_controller_1 = require("./exercicio.controller");
const match_decorator_1 = require("../../utils/match.decorator");
const encrypt_service_1 = require("../../utils/encrypt/encrypt.service");
const mongoose_1 = require("@nestjs/mongoose");
const exercicio_schema_1 = require("./schema/exercicio.schema");
let ExercicioModule = class ExercicioModule {
};
exports.ExercicioModule = ExercicioModule;
exports.ExercicioModule = ExercicioModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: exercicio_schema_1.Exercicio.name, schema: exercicio_schema_1.ExercicioSchema }])],
        controllers: [exercicio_controller_1.ExercicioController],
        providers: [exercicio_service_1.ExercicioService, match_decorator_1.Match, encrypt_service_1.EncryptService],
        exports: [exercicio_service_1.ExercicioService, encrypt_service_1.EncryptService],
    })
], ExercicioModule);
