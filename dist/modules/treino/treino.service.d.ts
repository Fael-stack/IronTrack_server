import { CreateTreinoDto } from "./dto/create-treino.dto";
import { UpdateTreinoDto } from "./dto/update-treino.dto";
export declare class TreinoService {
    create(createTreinoDto: CreateTreinoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTreinoDto: UpdateTreinoDto): string;
    remove(id: number): string;
}
