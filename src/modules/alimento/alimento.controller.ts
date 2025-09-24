import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AlimentoService } from "./alimento.service";
import { CreateAlimentoDto } from "./dto/create-alimento.dto";
import { UpdateAlimentoDto } from "./dto/update-alimento.dto";
import { EncryptService } from "src/utils/encrypt/encrypt.service";

@Controller("alimento")
export class AlimentoController {
  constructor(
    private readonly alimentoService: AlimentoService,
    private readonly encryptService: EncryptService,
  ) {}

  @Post()
  create(@Body() createAlimentoDto: CreateAlimentoDto) {
    return this.alimentoService.create(createAlimentoDto);
  }

  @Get()
  findAll() {
    return this.alimentoService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.alimentoService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAlimentoDto: UpdateAlimentoDto) {
    return this.alimentoService.update(id, updateAlimentoDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.alimentoService.delete(id);
  }
}