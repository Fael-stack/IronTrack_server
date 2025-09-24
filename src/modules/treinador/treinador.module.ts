import { Module } from "@nestjs/common";
import { TreinadorService } from "./treinador.service";
import { TreinadorController } from "./treinador.controller";
import { Match } from "src/utils/match.decorator";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Treinador, TreinadorSchema } from "./schema/treinador.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Treinador.name, schema: TreinadorSchema }])],
  controllers: [TreinadorController],
  providers: [TreinadorService, Match, EncryptService],
  exports: [TreinadorService, EncryptService],
})
export class TreinadorModule {}