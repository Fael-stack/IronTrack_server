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
const treino_service_1 = require("./treino.service");
const create_treino_dto_1 = require("./dto/create-treino.dto");
const update_treino_dto_1 = require("./dto/update-treino.dto");
const encrypt_service_1 = require("../../utils/encrypt/encrypt.service");
let TreinoController = class TreinoController {
    constructor(treinoService, encryptService) {
        this.treinoService = treinoService;
        this.encryptService = encryptService;
    }
    create(createTreinoDto) {
        return this.treinoService.create(createTreinoDto);
    }
    findAll() {
        return this.treinoService.findAll();
    }
    findOne(id) {
        return this.treinoService.findOne(id);
    }
    update(id, updateTreinoDto) {
        return this.treinoService.update(id, updateTreinoDto);
    }
    delete(id) {
        return this.treinoService.delete(id);
    }
};
exports.TreinoController = TreinoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_treino_dto_1.CreateTreinoDto]),
    __metadata("design:returntype", void 0)
], TreinoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreinoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreinoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_treino_dto_1.UpdateTreinoDto]),
    __metadata("design:returntype", void 0)
], TreinoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreinoController.prototype, "delete", null);
exports.TreinoController = TreinoController = __decorate([
    (0, common_1.Controller)("treino"),
    __metadata("design:paramtypes", [treino_service_1.TreinoService,
        encrypt_service_1.EncryptService])
], TreinoController);
