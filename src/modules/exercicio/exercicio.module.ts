import { Module } from "@nestjs/common";
import { ExercicioService } from "./exercicio.service";
import { ExercicioController } from "./exercicio.controller";
import { Match } from "src/utils/match.decorator";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Exercicio, ExercicioSchema } from "./schema/exercicio.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Exercicio.name, schema: ExercicioSchema }])],
  controllers: [ExercicioController],
  providers: [ExercicioService, Match, EncryptService],
  exports: [ExercicioService, EncryptService],
})
export class ExercicioModule {}