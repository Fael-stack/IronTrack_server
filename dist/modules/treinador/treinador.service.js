"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreinadorService = void 0;
const common_1 = require("@nestjs/common");
let TreinadorService = class TreinadorService {
    create(createTreinadorDto) {
        return "This action adds a new treinador";
    }
    findAll() {
        return `This action returns all treinador`;
    }
    findOne(id) {
        return `This action returns a #${id} treinador`;
    }
    update(id, updateTreinadorDto) {
        return `This action updates a #${id} treinador`;
    }
    remove(id) {
        return `This action removes a #${id} treinador`;
    }
};
exports.TreinadorService = TreinadorService;
exports.TreinadorService = TreinadorService = __decorate([
    (0, common_1.Injectable)()
], TreinadorService);
