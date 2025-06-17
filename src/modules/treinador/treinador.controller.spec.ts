import { Test, TestingModule } from "@nestjs/testing";
import { TreinadorController } from "./treinador.controller";
import { TreinadorService } from "./treinador.service";

describe("TreinadorController", () => {
  let controller: TreinadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreinadorController],
      providers: [TreinadorService],
    }).compile();

    controller = module.get<TreinadorController>(TreinadorController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
