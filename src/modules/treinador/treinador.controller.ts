import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TreinadorService } from "./treinador.service";
import { CreateTreinadorDto } from "./dto/create-treinador.dto";
import { UpdateTreinadorDto } from "./dto/update-treinador.dto";
import { EncryptService } from "src/utils/encrypt/encrypt.service";

@Controller("treinador")
export class TreinadorController {
  constructor(
    private readonly treinadorService: TreinadorService,
    private readonly encryptService: EncryptService,
  ) {}

  @Post()
  create(@Body() createTreinadorDto: CreateTreinadorDto) {
    return this.treinadorService.create(createTreinadorDto);
  }

  @Get()
  findAll() {
    return this.treinadorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.treinadorService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTreinadorDto: UpdateTreinadorDto,
  ) {
    return this.treinadorService.update(id, updateTreinadorDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.treinadorService.delete(id);
  }
}