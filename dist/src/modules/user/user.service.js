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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
const validate_id_1 = require("../../utils/validate.id");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(createUserDto) {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
    async findAll() {
        return await this.userModel.find().exec();
    }
    async findOne(id) {
        (0, validate_id_1.validateId)(id);
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User com id: ${id} não encontrado`);
        }
        return user;
    }
    async update(id, updateUserDTO) {
        (0, validate_id_1.validateId)(id);
        const user = await this.userModel
            .findByIdAndUpdate(id, updateUserDTO, { new: true })
            .exec();
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com id: ${id} não encontrado`);
        }
        return user;
    }
    async delete(id) {
        (0, validate_id_1.validateId)(id);
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User com id ${id} não encontrado`);
        }
        return { message: `User com id: ${id} deletado com sucesso` };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
