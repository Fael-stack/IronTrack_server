import { TreinadorService } from "./treinador.service";
import { CreateTreinadorDto } from "./dto/create-treinador.dto";
import { UpdateTreinadorDto } from "./dto/update-treinador.dto";
export declare class TreinadorController {
    private readonly treinadorService;
    constructor(treinadorService: TreinadorService);
    create(createTreinadorDto: CreateTreinadorDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTreinadorDto: UpdateTreinadorDto): string;
    remove(id: string): string;
}
