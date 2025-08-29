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
exports.DietaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dieta_schema_1 = require("./schema/dieta.schema");
const mongoose_2 = require("mongoose");
const validate_id_1 = require("../../utils/validate.id");
let DietaService = class DietaService {
    constructor(dietaModel) {
        this.dietaModel = dietaModel;
    }
    create(createDietaDto) {
        const newDieta = new this.dietaModel(createDietaDto);
        return newDieta.save();
    }
    findAll() {
        return `This action returns all dieta`;
    }
    async findOne(id) {
        (0, validate_id_1.validateId)(id);
        const dieta = await this.dietaModel.findById(id).exec();
        if (!dieta) {
            throw new common_1.NotFoundException(`Dieta com id: ${id} não encontrada`);
        }
        return dieta;
    }
    async update(id, updateDietaDto) {
        (0, validate_id_1.validateId)(id);
        const dieta = await this.dietaModel.findByIdAndUpdate(id, updateDietaDto, { new: true }).exec();
        if (!dieta) {
            throw new common_1.NotFoundException(`Dieta com id: ${id} não encontrada`);
        }
        return dieta;
    }
    async delete(id) {
        (0, validate_id_1.validateId)(id);
        const dieta = await this.dietaModel.findByIdAndDelete(id).exec();
        if (!dieta) {
            throw new common_1.NotFoundException(`Dieta com id ${id} não encontrada`);
        }
        return { message: `Dieta com id: ${id} deletada com sucesso` };
    }
};
exports.DietaService = DietaService;
exports.DietaService = DietaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(dieta_schema_1.Dieta.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DietaService);
