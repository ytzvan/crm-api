import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('new')
  async create(@Body() createProductDto: CreateProductDTO) {
    return this.productsService.create(createProductDto);
  }

  /*@Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }*/
}
