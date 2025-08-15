"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = validateId;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
function validateId(id) {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw new common_1.NotFoundException(`Id "${id}" não encontrado`);
    }
}
