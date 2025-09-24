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
exports.CreateDietaDto = void 0;
const class_validator_1 = require("class-validator");
class CreateDietaDto {
}
exports.CreateDietaDto = CreateDietaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório' }),
    __metadata("design:type", String)
], CreateDietaDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDietaDto.prototype, "objetivo", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)({ message: 'ID de usuário inválido' }),
    __metadata("design:type", String)
], CreateDietaDto.prototype, "usuari", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'A lista de alimentos não pode estar vazia' }),
    (0, class_validator_1.IsMongoId)({ each: true, message: 'ID de alimento inválido' }),
    __metadata("design:type", Array)
], CreateDietaDto.prototype, "alimentos", void 0);
