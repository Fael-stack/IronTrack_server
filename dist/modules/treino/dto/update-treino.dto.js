"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTreinoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_treino_dto_1 = require("./create-treino.dto");
class UpdateTreinoDto extends (0, mapped_types_1.PartialType)(create_treino_dto_1.CreateTreinoDto) {
}
exports.UpdateTreinoDto = UpdateTreinoDto;
