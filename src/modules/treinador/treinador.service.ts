import { Injectable } from "@nestjs/common";
import { CreateTreinadorDto } from "./dto/create-treinador.dto";
import { UpdateTreinadorDto } from "./dto/update-treinador.dto";

@Injectable()
export class TreinadorService {
  create(createTreinadorDto: CreateTreinadorDto) {
    return "This action adds a new treinador";
  }

  findAll() {
    return `This action returns all treinador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} treinador`;
  }

  update(id: number, updateTreinadorDto: UpdateTreinadorDto) {
    return `This action updates a #${id} treinador`;
  }

  remove(id: number) {
    return `This action removes a #${id} treinador`;
  }
}
