import { Controller, Post, Get, Delete, Body, Query, Param, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  /** POST /cart
   *  Body: { sessionId, productId, quantity }
   */
  @Post()
  addItem(
    @Body('sessionId') sessionId: string,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.addToCart(sessionId, productId, quantity);
  }

  /** GET /cart?sessionId=xxx */
  @Get()
  getCart(@Query('sessionId') sessionId: string) {
    return this.cartService.getCart(sessionId);
  }

  /** DELETE /cart/:id */
  @Delete(':id')
  removeItem(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeItem(id);
  }
}
