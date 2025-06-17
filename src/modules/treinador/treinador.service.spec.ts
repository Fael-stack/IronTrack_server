import { Test, TestingModule } from "@nestjs/testing";
import { TreinadorService } from "./treinador.service";

describe("TreinadorService", () => {
  let service: TreinadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreinadorService],
    }).compile();

    service = module.get<TreinadorService>(TreinadorService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
