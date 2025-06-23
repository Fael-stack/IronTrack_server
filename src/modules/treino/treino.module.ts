import { Module } from "@nestjs/common";
import { TreinoService } from "./treino.service";
import { TreinoController } from "./treino.controller";
import { Match } from "src/utils/match.decorator";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Treino, TreinoSchema } from "./schema/treino.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Treino.name, schema: TreinoSchema }])],
  controllers: [TreinoController],
  providers: [TreinoService, Match, EncryptService],
  exports: [TreinoService, EncryptService],
})
export class TreinoModule {}