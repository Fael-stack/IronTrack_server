// src/modules/treino/treino.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TreinoService } from './treino.service';
import { CreateTreinoDto } from './dto/create-treino.dto';
import { Treino } from './schema/treino.schema';

@Controller('treino')
export class TreinoController {
  constructor(private readonly treinoService: TreinoService) {}

  @Post()
async create(@Body() dto: CreateTreinoDto): Promise<Treino> {
  console.log('DTO recebido:', dto);
  return this.treinoService.create(dto);
}

  @Get()
  async findAll(): Promise<Treino[]> {
    return this.treinoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Treino | null> {
    return this.treinoService.findOne(id);
  }
}
