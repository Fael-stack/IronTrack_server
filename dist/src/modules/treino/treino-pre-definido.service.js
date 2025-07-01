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
exports.TreinoPreDefinidoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pre_definido_schema_1 = require("./schema/pre-definido.schema");
const pre_definidos_data_1 = require("./data/pre-definidos.data");
let TreinoPreDefinidoService = class TreinoPreDefinidoService {
    constructor(preDefinidoModel) {
        this.preDefinidoModel = preDefinidoModel;
    }
    async onModuleInit() {
        await this.seedDatabase();
    }
    async seedDatabase() {
        const count = await this.preDefinidoModel.countDocuments();
        if (count === 0) {
            console.log('Populando o banco de dados com treinos pré-definidos...');
            const todosOsTreinos = [
                ...pre_definidos_data_1.TREINOS_PARA_GANHAR_MASSA,
                ...pre_definidos_data_1.TREINOS_PARA_PERDER_GORDURA,
            ];
            await this.preDefinidoModel.insertMany(todosOsTreinos);
            console.log('Banco de dados populado com sucesso!');
        }
    }
    async getTreinoPorObjetivo(objetivo) {
        return this.preDefinidoModel.find({ objetivo }).exec();
    }
};
exports.TreinoPreDefinidoService = TreinoPreDefinidoService;
exports.TreinoPreDefinidoService = TreinoPreDefinidoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pre_definido_schema_1.PreDefinido.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TreinoPreDefinidoService);
