import { TreinadorService } from "./treinador.service";
import { CreateTreinadorDto } from "./dto/create-treinador.dto";
import { UpdateTreinadorDto } from "./dto/update-treinador.dto";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
export declare class TreinadorController {
    private readonly treinadorService;
    private readonly encryptService;
    constructor(treinadorService: TreinadorService, encryptService: EncryptService);
    create(createTreinadorDto: CreateTreinadorDto): Promise<import("./schema/treinador.schema").Treinador>;
    findAll(): Promise<import("./schema/treinador.schema").Treinador[]>;
    findOne(id: string): Promise<import("./schema/treinador.schema").Treinador>;
    update(id: string, updateTreinadorDto: UpdateTreinadorDto): Promise<import("./schema/treinador.schema").Treinador>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
