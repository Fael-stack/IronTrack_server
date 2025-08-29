import { Test, TestingModule } from "@nestjs/testing";
import { ExercicioController } from "./exercicio.controller";
import { ExercicioService } from "./exercicio.service";

describe("ExercicioController", () => {
  let controller: ExercicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercicioController],
      providers: [ExercicioService],
    }).compile();

    controller = module.get<ExercicioController>(ExercicioController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
