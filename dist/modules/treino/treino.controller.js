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
exports.TreinoController = void 0;
const common_1 = require("@nestjs/common");
const treino_pre_definido_service_1 = require("./treino-pre-definido.service");
const get_pre_definido_dto_1 = require("./dto/get-pre-definido.dto");
const swagger_1 = require("@nestjs/swagger");
const pre_definido_schema_1 = require("./schema/pre-definido.schema");
let TreinoController = class TreinoController {
    constructor(treinoPreDefinidoService) {
        this.treinoPreDefinidoService = treinoPreDefinidoService;
    }
    findPreDefinido(query) {
        return this.treinoPreDefinidoService.getTreinoPorObjetivo(query.objetivo);
    }
};
exports.TreinoController = TreinoController;
__decorate([
    (0, common_1.Get)('pre-definidos'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca um plano de treino pré-definido por objetivo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retorna a lista de exercícios para o objetivo.', type: [pre_definido_schema_1.PreDefinido] }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro de validação nos parâmetros da requisição.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_pre_definido_dto_1.GetPreDefinidoDto]),
    __metadata("design:returntype", Promise)
], TreinoController.prototype, "findPreDefinido", null);
exports.TreinoController = TreinoController = __decorate([
    (0, swagger_1.ApiTags)('Treinos'),
    (0, common_1.Controller)('treino'),
    __metadata("design:paramtypes", [treino_pre_definido_service_1.TreinoPreDefinidoService])
], TreinoController);
