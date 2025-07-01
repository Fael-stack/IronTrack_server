// src/modules/treino/treino.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { TreinoPreDefinidoService } from './treino-pre-definido.service';
import { GetPreDefinidoDto } from './dto/get-pre-definido.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PreDefinido } from './schema/pre-definido.schema';

@ApiTags('Treinos') // Agrupa este controller na UI do Swagger
@Controller('treino')
export class TreinoController {
  // Removi os outros serviços que não estão sendo usados neste endpoint
  constructor(
    private readonly treinoPreDefinidoService: TreinoPreDefinidoService,
  ) {}

  @Get('pre-definidos')
  @ApiOperation({ summary: 'Busca um plano de treino pré-definido por objetivo' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de exercícios para o objetivo.', type: [PreDefinido] })
  @ApiResponse({ status: 400, description: 'Erro de validação nos parâmetros da requisição.' })
  findPreDefinido(
    @Query() query: GetPreDefinidoDto,
  ): Promise<PreDefinido[]> {
    return this.treinoPreDefinidoService.getTreinoPorObjetivo(query.objetivo);
  }
}