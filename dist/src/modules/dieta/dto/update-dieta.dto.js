"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDietaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_dieta_dto_1 = require("./create-dieta.dto");
class UpdateDietaDto extends (0, mapped_types_1.PartialType)(create_dieta_dto_1.CreateDietaDto) {
}
exports.UpdateDietaDto = UpdateDietaDto;
