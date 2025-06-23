import { Test, TestingModule } from "@nestjs/testing";
import { TreinoController } from "./treino.controller";
import { TreinoService } from "./treino.service";

describe("TreinoController", () => {
  let controller: TreinoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreinoController],
      providers: [TreinoService],
    }).compile();

    controller = module.get<TreinoController>(TreinoController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
