import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Match } from "src/utils/match.decorator";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, Match, EncryptService],
  exports: [
    UserService,
    EncryptService,
    MongooseModule, // <-- Adicione esta linha
  ],
})
export class UserModule {}

