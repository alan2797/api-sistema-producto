import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ProductStatus } from '../enums/status-product.enum';
import { ProductCategory } from '../enums/category-product.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { ProductType } from '../enums/type-product.enum';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsOptional()
  category: ProductCategory;

  @ApiProperty()
  @IsOptional()
  type: ProductType;

  @ApiProperty()
  @IsOptional()
  stock: number;

  @ApiProperty()
  @IsOptional()
  userId: string;
}
