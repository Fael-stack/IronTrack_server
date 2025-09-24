import { TreinoService } from './treino.service';
import { CreateTreinoDto } from './dto/create-treino.dto';
import { Treino } from './schema/treino.schema';
export declare class TreinoController {
    private readonly treinoService;
    constructor(treinoService: TreinoService);
    create(dto: CreateTreinoDto): Promise<Treino>;
    findAll(): Promise<Treino[]>;
    findOne(id: string): Promise<Treino | null>;
}
