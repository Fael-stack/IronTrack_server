import { Test, TestingModule } from "@nestjs/testing";
import { ExercicioService } from "./exercicio.service";

describe("ExercicioService", () => {
  let service: ExercicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExercicioService],
    }).compile();

    service = module.get<ExercicioService>(ExercicioService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
