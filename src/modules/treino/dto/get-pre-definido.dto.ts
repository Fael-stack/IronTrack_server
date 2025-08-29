// src/modules/treino/dto/get-pre-definido.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class GetPreDefinidoDto {
  @ApiProperty({
    description: 'O objetivo desejado para o plano de treino',
    enum: ['ganhar-massa', 'perder-gordura'],
    example: 'ganhar-massa',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['ganhar-massa', 'perder-gordura'], {
    message: 'O objetivo deve ser "ganhar-massa" ou "perder-gordura".',
  })
  objetivo!: string;
}