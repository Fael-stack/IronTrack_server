"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExercicioDto = void 0;
const class_validator_1 = require("class-validator");
class CreateExercicioDto {
}
exports.CreateExercicioDto = CreateExercicioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório' }),
    __metadata("design:type", String)
], CreateExercicioDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExercicioDto.prototype, "descricao", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExercicioDto.prototype, "grupoMuscular", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.duracaoMinutos !== undefined),
    (0, class_validator_1.IsNumber)({}, { message: 'Duração deve ser um número' }),
    (0, class_validator_1.Min)(1, { message: 'Duração mínima é 1 minuto' }),
    __metadata("design:type", Number)
], CreateExercicioDto.prototype, "duracaoMinutos", void 0);
