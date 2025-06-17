import { Module } from "@nestjs/common";
import { TreinoService } from "./treino.service";
import { TreinoController } from "./treino.controller";

@Module({
  controllers: [TreinoController],
  providers: [TreinoService],
})
export class TreinoModule {}
