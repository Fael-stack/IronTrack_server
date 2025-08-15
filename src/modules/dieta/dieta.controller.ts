// src/modules/dieta/dieta.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { DietaPreDefinidaService } from './dieta-pre-definida.service';
import { GetPreDefinidoDto } from './dto/get-pre-definido_dieta.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PreDefinido } from './schema/pre-definido_dieta.schema';

@ApiTags('Dietas') // Agrupa este controller na UI do Swagger
@Controller('dieta')
export class DietaController {
  // Removi os outros serviços que não estão sendo usados neste endpoint
  constructor(
    private readonly dietaPreDefinidaService: DietaPreDefinidaService,
  ) {}

  @Get('pre-definidas')
  @ApiOperation({ summary: 'Busca uma dieta pré-definida por objetivo' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de dietas para o objetivo.', type: [PreDefinido] })
  @ApiResponse({ status: 400, description: 'Erro de validação nos parâmetros da requisição.' })
  findPreDefinida(
    @Query() query: GetPreDefinidoDto,
  ): Promise<PreDefinido[]> {
    return this.dietaPreDefinidaService.getDietaPorObjetivo(query.objetivo);
  }
}