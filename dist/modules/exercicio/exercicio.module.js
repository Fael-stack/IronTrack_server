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
let ExercicioModule = class ExercicioModule {
};
exports.ExercicioModule = ExercicioModule;
exports.ExercicioModule = ExercicioModule = __decorate([
    (0, common_1.Module)({
        controllers: [exercicio_controller_1.ExercicioController],
        providers: [exercicio_service_1.ExercicioService],
    })
], ExercicioModule);
