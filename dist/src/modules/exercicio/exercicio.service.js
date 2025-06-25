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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercicioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const exercicio_schema_1 = require("./schema/exercicio.schema");
const mongoose_2 = require("mongoose");
const validate_id_1 = require("../../utils/validate.id");
let ExercicioService = class ExercicioService {
    constructor(exercicioModel) {
        this.exercicioModel = exercicioModel;
    }
    create(createExercicioDto) {
        const newExercicio = new this.exercicioModel(createExercicioDto);
        return newExercicio.save();
    }
    findAll() {
        return this.exercicioModel.find().exec();
    }
    async findOne(id) {
        (0, validate_id_1.validateId)(id);
        const exercicio = await this.exercicioModel.findById(id).exec();
        if (!exercicio) {
            throw new common_1.NotFoundException(`Exercicio com id: ${id} não encontrado`);
        }
        return exercicio;
    }
    async update(id, updateExercicioDto) {
        (0, validate_id_1.validateId)(id);
        const exercicio = await this.exercicioModel
            .findByIdAndUpdate(id, updateExercicioDto, { new: true })
            .exec();
        if (!exercicio) {
            throw new common_1.NotFoundException(`Exercicio com id: ${id} não encontrado`);
        }
        return exercicio;
    }
    async delete(id) {
        (0, validate_id_1.validateId)(id);
        const exercicio = await this.exercicioModel.findByIdAndDelete(id).exec();
        if (!exercicio) {
            throw new common_1.NotFoundException(`Exercicio com id ${id} não encontrado`);
        }
        return { message: `Exercicio com id: ${id} deletado com sucesso` };
    }
};
exports.ExercicioService = ExercicioService;
exports.ExercicioService = ExercicioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(exercicio_schema_1.Exercicio.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ExercicioService);
