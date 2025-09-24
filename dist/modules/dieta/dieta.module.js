"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pre_definido_dieta_schema_1 = require("./schema/pre-definido_dieta.schema");
const dieta_schema_1 = require("./schema/dieta.schema");
let DietaModule = class DietaModule {
};
exports.DietaModule = DietaModule;
exports.DietaModule = DietaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: pre_definido_dieta_schema_1.PreDefinido.name, schema: pre_definido_dieta_schema_1.PreDefinidoSchema },
                { name: dieta_schema_1.Dieta.name, schema: dieta_schema_1.DietaSchema },
            ]),
        ],
    })
], DietaModule);
