import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/shared/utils/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductStatus } from '../enums/status-product.enum';
import { ProductType } from '../enums/type-product.enum';
import { ProductCategory } from '../enums/category-product.enum';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Product extends BaseEntity {
  @ApiProperty()
  @Column({ length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 16, scale: 2, nullable: true })
  price: number;

  @ApiProperty({ enum: ProductStatus, enumName: 'ProductStatus' })
  @Column({ length: 1, nullable: true, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @ApiProperty()
  @Column({ type: 'integer', nullable: true, default: 0 })
  stock: number;

  @ApiProperty({ enum: ProductType, enumName: 'ProductType' })
  @Column({ length: 1, nullable: true, default: ProductType.PRODUCT })
  type: ProductType;

  @ApiProperty({ enum: ProductCategory, enumName: 'ProductCategory' })
  @Column({ nullable: true, default: ProductCategory.ACCESORIOS })
  category: ProductCategory;

  @ApiProperty()
  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.user)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
