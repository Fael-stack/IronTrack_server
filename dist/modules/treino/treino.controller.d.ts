import { TreinoPreDefinidoService } from './treino-pre-definido.service';
import { GetPreDefinidoDto } from './dto/get-pre-definido.dto';
import { PreDefinido } from './schema/pre-definido.schema';
export declare class TreinoController {
    private readonly treinoPreDefinidoService;
    constructor(treinoPreDefinidoService: TreinoPreDefinidoService);
    findPreDefinido(query: GetPreDefinidoDto): Promise<PreDefinido[]>;
}
