import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('api/v1/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  create(@Body() createBannerDto: any) {
    const { id, ...rest } = createBannerDto;
    const newBanner = this.bannerService.create(rest);
    const allBanner = this.bannerService.findAll();
    return {
      message: 'Them thanh cong',
      data: allBanner,
    };
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
      message: 'Cap nhat thanh cong',
      result,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    console.log(id);
    const deletedId = await this.bannerService.remove(id);
    return {
      message: 'Xóa thành công',
      deletedId: deletedId,
    };
  }
}
