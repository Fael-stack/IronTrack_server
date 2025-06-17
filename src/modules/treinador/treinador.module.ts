import { Module } from "@nestjs/common";
import { TreinadorService } from "./treinador.service";
import { TreinadorController } from "./treinador.controller";

@Module({
  controllers: [TreinadorController],
  providers: [TreinadorService],
})
export class TreinadorModule {}
