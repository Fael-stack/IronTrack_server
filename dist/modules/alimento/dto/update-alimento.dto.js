"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlimentoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_alimento_dto_1 = require("./create-alimento.dto");
class UpdateAlimentoDto extends (0, mapped_types_1.PartialType)(create_alimento_dto_1.CreateAlimentoDto) {
}
exports.UpdateAlimentoDto = UpdateAlimentoDto;
