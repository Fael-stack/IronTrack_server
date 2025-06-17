import { Injectable } from "@nestjs/common";
import { CreateTreinoDto } from "./dto/create-treino.dto";
import { UpdateTreinoDto } from "./dto/update-treino.dto";

@Injectable()
export class TreinoService {
  create(createTreinoDto: CreateTreinoDto) {
    return "This action adds a new treino";
  }

  findAll() {
    return `This action returns all treino`;
  }

  findOne(id: number) {
    return `This action returns a #${id} treino`;
  }

  update(id: number, updateTreinoDto: UpdateTreinoDto) {
    return `This action updates a #${id} treino`;
  }

  remove(id: number) {
    return `This action removes a #${id} treino`;
  }
}
