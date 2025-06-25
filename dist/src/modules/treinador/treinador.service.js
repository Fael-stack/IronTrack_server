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
exports.TreinadorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const treinador_schema_1 = require("./schema/treinador.schema");
const mongoose_2 = require("mongoose");
const validate_id_1 = require("../../utils/validate.id");
let TreinadorService = class TreinadorService {
    constructor(treinadorModel) {
        this.treinadorModel = treinadorModel;
    }
    create(createTreinadorDto) {
        const newTreinador = new this.treinadorModel(createTreinadorDto);
        return newTreinador.save();
    }
    findAll() {
        return this.treinadorModel.find().exec();
    }
    async findOne(id) {
        (0, validate_id_1.validateId)(id);
        const treinador = await this.treinadorModel.findById(id).exec();
        if (!treinador) {
            throw new common_1.NotFoundException(`Treinador com id: ${id} não encontrado`);
        }
        return treinador;
    }
    async update(id, updateTreinadorDto) {
        (0, validate_id_1.validateId)(id);
        const treinador = await this.treinadorModel
            .findByIdAndUpdate(id, updateTreinadorDto, { new: true })
            .exec();
        if (!treinador) {
            throw new common_1.NotFoundException(`Treinador com id: ${id} não encontrado`);
        }
        return treinador;
    }
    async delete(id) {
        (0, validate_id_1.validateId)(id);
        const treinador = await this.treinadorModel.findByIdAndDelete(id).exec();
        if (!treinador) {
            throw new common_1.NotFoundException(`Treinador com id ${id} não encontrado`);
        }
        return { message: `Treinador com id: ${id} deletado com sucesso` };
    }
};
exports.TreinadorService = TreinadorService;
exports.TreinadorService = TreinadorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(treinador_schema_1.Treinador.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TreinadorService);
