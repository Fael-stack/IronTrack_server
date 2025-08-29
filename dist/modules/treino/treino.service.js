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
exports.TreinoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const treino_schema_1 = require("./schema/treino.schema");
const mongoose_2 = require("mongoose");
const validate_id_1 = require("../../utils/validate.id");
let TreinoService = class TreinoService {
    constructor(treinoModel) {
        this.treinoModel = treinoModel;
    }
    create(createTreinoDto) {
        const newTreino = new this.treinoModel(createTreinoDto);
        return newTreino.save();
    }
    findAll() {
        return this.treinoModel.find().exec();
    }
    async findOne(id) {
        (0, validate_id_1.validateId)(id);
        const treino = await this.treinoModel.findById(id).exec();
        if (!treino) {
            throw new common_1.NotFoundException(`Treino com id: ${id} não encontrado`);
        }
        return treino;
    }
    async update(id, updateTreinoDto) {
        (0, validate_id_1.validateId)(id);
        const treino = await this.treinoModel
            .findByIdAndUpdate(id, updateTreinoDto, { new: true })
            .exec();
        if (!treino) {
            throw new common_1.NotFoundException(`Treino com id: ${id} não encontrado`);
        }
        return treino;
    }
    async delete(id) {
        (0, validate_id_1.validateId)(id);
        const treino = await this.treinoModel.findByIdAndDelete(id).exec();
        if (!treino) {
            throw new common_1.NotFoundException(`Treino com id ${id} não encontrado`);
        }
        return { message: `Treino com id: ${id} deletado com sucesso` };
    }
};
exports.TreinoService = TreinoService;
exports.TreinoService = TreinoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(treino_schema_1.Treino.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TreinoService);
