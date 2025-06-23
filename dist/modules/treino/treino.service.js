"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreinoService = void 0;
const common_1 = require("@nestjs/common");
let TreinoService = class TreinoService {
    create(createTreinoDto) {
        return "This action adds a new treino";
    }
    findAll() {
        return `This action returns all treino`;
    }
    findOne(id) {
        return `This action returns a #${id} treino`;
    }
    update(id, updateTreinoDto) {
        return `This action updates a #${id} treino`;
    }
    remove(id) {
        return `This action removes a #${id} treino`;
    }
};
exports.TreinoService = TreinoService;
exports.TreinoService = TreinoService = __decorate([
    (0, common_1.Injectable)()
], TreinoService);
