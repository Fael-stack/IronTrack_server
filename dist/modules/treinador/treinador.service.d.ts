import { CreateTreinadorDto } from "./dto/create-treinador.dto";
import { UpdateTreinadorDto } from "./dto/update-treinador.dto";
export declare class TreinadorService {
    create(createTreinadorDto: CreateTreinadorDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTreinadorDto: UpdateTreinadorDto): string;
    remove(id: number): string;
}
