import { AlimentoService } from "./alimento.service";
import { CreateAlimentoDto } from "./dto/create-alimento.dto";
import { UpdateAlimentoDto } from "./dto/update-alimento.dto";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
export declare class AlimentoController {
    private readonly alimentoService;
    private readonly encryptService;
    constructor(alimentoService: AlimentoService, encryptService: EncryptService);
    create(createAlimentoDto: CreateAlimentoDto): Promise<import("./schema/alimento.schema").Alimento>;
    findAll(): Promise<import("./schema/alimento.schema").Alimento[]>;
    findOne(id: string): Promise<import("./schema/alimento.schema").Alimento>;
    update(id: string, updateAlimentoDto: UpdateAlimentoDto): Promise<import("./schema/alimento.schema").Alimento>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
