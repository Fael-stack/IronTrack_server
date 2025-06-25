import { TreinoService } from "./treino.service";
import { CreateTreinoDto } from "./dto/create-treino.dto";
import { UpdateTreinoDto } from "./dto/update-treino.dto";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
export declare class TreinoController {
    private readonly treinoService;
    private readonly encryptService;
    constructor(treinoService: TreinoService, encryptService: EncryptService);
    create(createTreinoDto: CreateTreinoDto): Promise<import("./schema/treino.schema").Treino>;
    findAll(): Promise<import("./schema/treino.schema").Treino[]>;
    findOne(id: string): Promise<import("./schema/treino.schema").Treino>;
    update(id: string, updateTreinoDto: UpdateTreinoDto): Promise<import("./schema/treino.schema").Treino>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
