import { Injectable } from "@nestjs/common";
import { CreateAlimentoDto } from "./dto/create-alimento.dto";
import { UpdateAlimentoDto } from "./dto/update-alimento.dto";

@Injectable()
export class AlimentoService {
  create(createAlimentoDto: CreateAlimentoDto) {
    return "This action adds a new alimento";
  }

  findAll() {
    return `This action returns all alimento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alimento`;
  }

  update(id: number, updateAlimentoDto: UpdateAlimentoDto) {
    return `This action updates a #${id} alimento`;
  }

  remove(id: number) {
    return `This action removes a #${id} alimento`;
  }
}
