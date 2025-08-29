import { Test, TestingModule } from "@nestjs/testing";
import { AlimentoController } from "./alimento.controller";
import { AlimentoService } from "./alimento.service";

describe("AlimentoController", () => {
  let controller: AlimentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlimentoController],
      providers: [AlimentoService],
    }).compile();

    controller = module.get<AlimentoController>(AlimentoController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
