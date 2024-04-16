import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannerService {
  constructor(@InjectRepository(Banner) private bannerRepos: Repository<Banner>) {}

  async create(createBannerDto: CreateBannerDto) {
    const banner = this.bannerRepos.create(createBannerDto);
    return this.bannerRepos.save(banner);
  }

  findAll() {
    return this.bannerRepos.find();
  }

  findOne(id: number) {
    return 
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
        return await this.bannerRepos
      .createQueryBuilder()
      .update(Banner)
      .set(updateBannerDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    console.log(id)
    const result = await this.bannerRepos.delete(id);
    return result
  }
}
