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
exports.AlimentoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const alimento_schema_1 = require("./schema/alimento.schema");
const mongoose_2 = require("mongoose");
const validate_id_1 = require("../../utils/validate.id");
let AlimentoService = class AlimentoService {
    constructor(alimentoModel) {
        this.alimentoModel = alimentoModel;
    }
    create(createAlimentoDto) {
        const newAlimento = new this.alimentoModel(createAlimentoDto);
        return newAlimento.save();
    }
    findAll() {
        return this.alimentoModel.find().exec();
    }
    async findOne(id) {
        (0, validate_id_1.validateId)(id);
        const alimento = await this.alimentoModel.findById(id).exec();
        if (!alimento) {
            throw new common_1.NotFoundException(`Alimento com id: ${id} não encontrado`);
        }
        return alimento;
    }
    async update(id, updateAlimentoDto) {
        (0, validate_id_1.validateId)(id);
        const alimento = await this.alimentoModel
            .findByIdAndUpdate(id, updateAlimentoDto, { new: true })
            .exec();
        if (!alimento) {
            throw new common_1.NotFoundException(`Alimento com id: ${id} não encontrado`);
        }
        return alimento;
    }
    async delete(id) {
        (0, validate_id_1.validateId)(id);
        const alimento = await this.alimentoModel.findByIdAndDelete(id).exec();
        if (!alimento) {
            throw new common_1.NotFoundException(`Alimento com id ${id} não encontrado`);
        }
        return { message: `Alimento com id: ${id} deletado com sucesso` };
    }
};
exports.AlimentoService = AlimentoService;
exports.AlimentoService = AlimentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(alimento_schema_1.Alimento.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AlimentoService);
