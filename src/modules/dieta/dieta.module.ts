import { Module } from "@nestjs/common";
import { DietaService } from "./dieta.service";
import { DietaController } from "./dieta.controller";
import { Match } from "src/utils/match.decorator";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Dieta, DietaSchema } from "./schema/dieta.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Dieta.name, schema: DietaSchema }])],
  controllers: [DietaController],
  providers: [DietaService, Match, EncryptService],
  exports: [DietaService, EncryptService],
})
export class DietaModule {}