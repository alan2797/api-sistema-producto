import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiArrayResponse } from 'src/shared/decorators/api-array-response.decorator';
import { ApiObjResponse } from 'src/shared/decorators/api-obj-response';
import { GenericController } from 'src/shared/generic/controllers/generic.controller';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationResponseDto } from 'src/shared/dto/PaginationResponseDto.dto';
import { User } from '../user/entities/user.entity';
import { Users } from 'src/shared/decorators/user.decorator';
import { MessageResponse } from 'src/constants/message-response';
import { SuccessMessage } from 'src/shared/decorators/success-message.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

@ApiExtraModels(Product)
@ApiTags('Product')
@Controller('product')
@UseGuards(RolesGuard) // Aplica el guard a todos los endpoints del controlador
export class ProductController extends GenericController<Product> {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }

  @Post('create')
  @Roles('ADMIN')
  @ApiObjResponse(Product)
  @SuccessMessage(MessageResponse.CREATE)
  createProduct(@Body() data: CreateProductDto, @Users() user: User) {
    data.userId = user.id;
    return super.create(data);
  }

  @Get('user')
  @Roles('ADMIN', 'USER')
  @ApiArrayResponse(Product)
  findAllByUser(@Users() user: User) {
    return this.productService.findAllByUser(user);
  }

  @Get()
  @Roles('ADMIN', 'USER')
  @ApiArrayResponse(Product)
  findAll() {
    return super.findAll();
  }

  @Get('paginate')
  @Roles('ADMIN', 'USER')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiArrayResponse(PaginationResponseDto)
  async findProductsPaginate(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<PaginationResponseDto<any>> {
    return await this.productService.findProductsPaginate(
      Number(page),
      Number(limit),
    );
  }

  @Post()
  @Roles('ADMIN')
  @ApiObjResponse(Product)
  create(@Body() data: CreateProductDto) {
    return super.create(data);
  }

  @Put(':id')
  @Roles('ADMIN')
  @SuccessMessage(MessageResponse.UPDATE)
  @ApiObjResponse(Product)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return super.update(id, updateProductDto);
  }

  @Get(':id')
  @Roles('ADMIN', 'USER')
  @ApiObjResponse(Product)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return super.findOne(id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @SuccessMessage(MessageResponse.DELETE)
  @ApiObjResponse(Boolean)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return super.delete(id);
  }
}
