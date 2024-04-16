import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('api/v1/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  create(@Body() createBannerDto: CreateBannerDto) {
    const newBanner = this.bannerService.create(createBannerDto);
    const allBanner = this.bannerService.findAll();
    return {
      message:"Them thanh cong",
      data:allBanner
    }
  }

  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    const result = this.bannerService.update(+id, updateBannerDto);
    return {
      message:"Cap nhat thanh cong",
      result
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.bannerService.remove(+id);
    const allBanner = this.bannerService.findAll();
    return {
      message:"Xoa thanh cong",
      data: allBanner
    }
  }
}
