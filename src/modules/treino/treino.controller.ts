import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TreinoService } from "./treino.service";
import { CreateTreinoDto } from "./dto/create-treino.dto";
import { UpdateTreinoDto } from "./dto/update-treino.dto";
import { EncryptService } from "src/utils/encrypt/encrypt.service";

@Controller("treino")
export class TreinoController {
  constructor(
    private readonly treinoService: TreinoService,
    private readonly encryptService: EncryptService,
  ) {}

  @Post()
  create(@Body() createTreinoDto: CreateTreinoDto) {
    return this.treinoService.create(createTreinoDto);
  }

  @Get()
  findAll() {
    return this.treinoService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.treinoService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTreinoDto: UpdateTreinoDto,
  ) {
    return this.treinoService.update(id, updateTreinoDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.treinoService.delete(id);
  }
}