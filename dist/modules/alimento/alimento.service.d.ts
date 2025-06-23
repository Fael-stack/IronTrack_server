import { CreateAlimentoDto } from "./dto/create-alimento.dto";
import { UpdateAlimentoDto } from "./dto/update-alimento.dto";
export declare class AlimentoService {
    create(createAlimentoDto: CreateAlimentoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAlimentoDto: UpdateAlimentoDto): string;
    remove(id: number): string;
}
