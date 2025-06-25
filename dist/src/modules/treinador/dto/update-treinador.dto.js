"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTreinadorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_treinador_dto_1 = require("./create-treinador.dto");
class UpdateTreinadorDto extends (0, mapped_types_1.PartialType)(create_treinador_dto_1.CreateTreinadorDto) {
}
exports.UpdateTreinadorDto = UpdateTreinadorDto;
