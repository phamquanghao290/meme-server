import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
 @Get("getCartByUserId/:id")
  async getCartByUserId(@Param() userId: any) {
    return await this.cartService.findOne(Number(userId.id))
  }

  @Post("addToCart")
  async create(@Body() createCartDto: any) {
    console.log(createCartDto);
    const { product, userId, colorId ,sizeId } = createCartDto
      return await this.cartService.create(userId,product,colorId,sizeId)
    ;
  }

  @Put('increase')
  async increase(@Body() createCartDto: any) {
    return await this.cartService.increaseStock(createCartDto)
  }

  @Put('decrease')
  async decrease(@Body() createCartDto: any) {
    return await this.cartService.decreaseStock(createCartDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cartService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cartService.remove(+id);
  }
}
