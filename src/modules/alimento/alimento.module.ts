import { Module } from "@nestjs/common";
import { AlimentoService } from "./alimento.service";
import { AlimentoController } from "./alimento.controller";
import { Match } from "src/utils/match.decorator";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Alimento, AlimentoSchema } from "./schema/alimento.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Alimento.name, schema: AlimentoSchema }])],
  controllers: [AlimentoController],
  providers: [AlimentoService, Match, EncryptService],
  exports: [AlimentoService, EncryptService],
})
export class AlimentoModule {}
