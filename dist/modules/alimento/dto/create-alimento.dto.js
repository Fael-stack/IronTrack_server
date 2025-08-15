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
exports.CreateAlimentoDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAlimentoDto {
}
exports.CreateAlimentoDto = CreateAlimentoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório' }),
    __metadata("design:type", String)
], CreateAlimentoDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Calorias deve ser um número' }),
    (0, class_validator_1.Min)(0, { message: 'Calorias não pode ser negativa' }),
    __metadata("design:type", Number)
], CreateAlimentoDto.prototype, "calorias", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Proteínas deve ser um número' }),
    (0, class_validator_1.Min)(0, { message: 'Proteínas não pode ser negativa' }),
    __metadata("design:type", Number)
], CreateAlimentoDto.prototype, "proteinas", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Carboidratos deve ser um número' }),
    (0, class_validator_1.Min)(0, { message: 'Carboidratos não pode ser negativo' }),
    __metadata("design:type", Number)
], CreateAlimentoDto.prototype, "carboidratos", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Gorduras deve ser um número' }),
    (0, class_validator_1.Min)(0, { message: 'Gorduras não pode ser negativa' }),
    __metadata("design:type", Number)
], CreateAlimentoDto.prototype, "gorduras", void 0);
