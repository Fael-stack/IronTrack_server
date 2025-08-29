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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietaSchema = exports.Dieta = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Dieta = class Dieta {
};
exports.Dieta = Dieta;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Dieta.prototype, "nome", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Dieta.prototype, "objetivo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Usuario" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Dieta.prototype, "usuari", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: "Alimento" }] }),
    __metadata("design:type", Array)
], Dieta.prototype, "alimentos", void 0);
exports.Dieta = Dieta = __decorate([
    (0, mongoose_1.Schema)()
], Dieta);
exports.DietaSchema = mongoose_1.SchemaFactory.createForClass(Dieta);
