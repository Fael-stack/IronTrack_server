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
exports.DietaController = void 0;
const common_1 = require("@nestjs/common");
const dieta_service_1 = require("./dieta.service");
const create_dieta_dto_1 = require("./dto/create-dieta.dto");
const update_dieta_dto_1 = require("./dto/update-dieta.dto");
let DietaController = class DietaController {
    constructor(dietaService) {
        this.dietaService = dietaService;
    }
    create(createDietaDto) {
        return this.dietaService.create(createDietaDto);
    }
    findAll() {
        return this.dietaService.findAll();
    }
    findOne(id) {
        return this.dietaService.findOne(+id);
    }
    update(id, updateDietaDto) {
        return this.dietaService.update(+id, updateDietaDto);
    }
    remove(id) {
        return this.dietaService.remove(+id);
    }
};
exports.DietaController = DietaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dieta_dto_1.CreateDietaDto]),
    __metadata("design:returntype", void 0)
], DietaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DietaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DietaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dieta_dto_1.UpdateDietaDto]),
    __metadata("design:returntype", void 0)
], DietaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DietaController.prototype, "remove", null);
exports.DietaController = DietaController = __decorate([
    (0, common_1.Controller)("dieta"),
    __metadata("design:paramtypes", [dieta_service_1.DietaService])
], DietaController);
