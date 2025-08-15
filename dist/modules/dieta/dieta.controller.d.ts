import { DietaPreDefinidaService } from './dieta-pre-definida.service';
import { GetPreDefinidoDto } from './dto/get-pre-definido_dieta.dto';
import { PreDefinido } from './schema/pre-definido_dieta.schema';
export declare class DietaController {
    private readonly dietaPreDefinidaService;
    constructor(dietaPreDefinidaService: DietaPreDefinidaService);
    findPreDefinida(query: GetPreDefinidoDto): Promise<PreDefinido[]>;
}
