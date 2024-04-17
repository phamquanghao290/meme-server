import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SizeService {
   constructor(
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) { }
  create(createSizeDto: CreateSizeDto) {
    return 'This action adds a new size';
  }

  async findAll() {
   return await this.sizeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} size`;
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return `This action updates a #${id} size`;
  }

  remove(id: number) {
    return `This action removes a #${id} size`;
  }
}
