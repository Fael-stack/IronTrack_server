import { TreinoService } from "./treino.service";
import { CreateTreinoDto } from "./dto/create-treino.dto";
import { UpdateTreinoDto } from "./dto/update-treino.dto";
export declare class TreinoController {
    private readonly treinoService;
    constructor(treinoService: TreinoService);
    create(createTreinoDto: CreateTreinoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTreinoDto: UpdateTreinoDto): string;
    remove(id: string): string;
}
