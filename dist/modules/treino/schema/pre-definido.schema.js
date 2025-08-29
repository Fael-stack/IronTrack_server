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
exports.PreDefinidoSchema = exports.PreDefinido = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PreDefinido = class PreDefinido {
};
exports.PreDefinido = PreDefinido;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PreDefinido.prototype, "nome", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PreDefinido.prototype, "grupoMuscular", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PreDefinido.prototype, "series", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PreDefinido.prototype, "duracaoMinutos", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], PreDefinido.prototype, "objetivo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['segunda', 'terca', 'quarta', 'sexta'],
    }),
    __metadata("design:type", String)
], PreDefinido.prototype, "dia", void 0);
exports.PreDefinido = PreDefinido = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PreDefinido);
exports.PreDefinidoSchema = mongoose_1.SchemaFactory.createForClass(PreDefinido);
