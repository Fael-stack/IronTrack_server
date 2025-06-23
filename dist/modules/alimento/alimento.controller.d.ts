import { AlimentoService } from "./alimento.service";
import { CreateAlimentoDto } from "./dto/create-alimento.dto";
import { UpdateAlimentoDto } from "./dto/update-alimento.dto";
export declare class AlimentoController {
    private readonly alimentoService;
    constructor(alimentoService: AlimentoService);
    create(createAlimentoDto: CreateAlimentoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAlimentoDto: UpdateAlimentoDto): string;
    remove(id: string): string;
}
