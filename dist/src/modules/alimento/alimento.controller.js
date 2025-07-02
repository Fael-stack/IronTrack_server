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
exports.AlimentoController = void 0;
const common_1 = require("@nestjs/common");
const alimento_service_1 = require("./alimento.service");
const create_alimento_dto_1 = require("./dto/create-alimento.dto");
const update_alimento_dto_1 = require("./dto/update-alimento.dto");
const encrypt_service_1 = require("../../utils/encrypt/encrypt.service");
let AlimentoController = class AlimentoController {
    constructor(alimentoService, encryptService) {
        this.alimentoService = alimentoService;
        this.encryptService = encryptService;
    }
    create(createAlimentoDto) {
        return this.alimentoService.create(createAlimentoDto);
    }
    findAll() {
        return this.alimentoService.findAll();
    }
    findOne(id) {
        return this.alimentoService.findOne(id);
    }
    update(id, updateAlimentoDto) {
        return this.alimentoService.update(id, updateAlimentoDto);
    }
    delete(id) {
        return this.alimentoService.delete(id);
    }
};
exports.AlimentoController = AlimentoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_alimento_dto_1.CreateAlimentoDto]),
    __metadata("design:returntype", void 0)
], AlimentoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlimentoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlimentoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alimento_dto_1.UpdateAlimentoDto]),
    __metadata("design:returntype", void 0)
], AlimentoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlimentoController.prototype, "delete", null);
exports.AlimentoController = AlimentoController = __decorate([
    (0, common_1.Controller)("alimento"),
    __metadata("design:paramtypes", [alimento_service_1.AlimentoService,
        encrypt_service_1.EncryptService])
], AlimentoController);
