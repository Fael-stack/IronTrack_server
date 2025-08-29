import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ExercicioService } from "./exercicio.service";
import { CreateExercicioDto } from "./dto/create-exercicio.dto";
import { UpdateExercicioDto } from "./dto/update-exercicio.dto";
import { EncryptService } from "src/utils/encrypt/encrypt.service";

@Controller("exercicio")
export class ExercicioController {
  constructor(
    private readonly exercicioService: ExercicioService,
    private readonly encryptService: EncryptService,
  ) {}

  @Post()
  create(@Body() createExercicioDto: CreateExercicioDto) {
    return this.exercicioService.create(createExercicioDto);
  }

  @Get()
  findAll() {
    return this.exercicioService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.exercicioService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateExercicioDto: UpdateExercicioDto,
  ) {
    return this.exercicioService.update(id, updateExercicioDto);
  }

  @Delete(':id') 
    delete(@Param('id') id: string) {
        return this.exercicioService.delete(id)
  }
}