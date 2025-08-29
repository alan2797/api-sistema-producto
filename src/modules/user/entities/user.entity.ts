import { BaseEntity } from 'src/shared/utils/base.entity';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusEnum } from '../enums/status.enum';
import { Exclude } from 'class-transformer';
import { RolEnum } from '../enums/rol.enum';
import { Product } from 'src/modules/product/entities/product.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, length: 100 })
  user: string;

  @Column({ length: 100, nullable: true })
  @Exclude()
  password: string;

  @ApiProperty({ enum: StatusEnum, enumName: 'StatusEnum' })
  @IsEnum(StatusEnum)
  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVO,
  })
  status: StatusEnum;

  @ApiProperty({ enum: RolEnum, enumName: 'RolEnum' })
  @Column({
    type: 'enum',
    enum: RolEnum,
    default: RolEnum.USER,
  })
  rol: RolEnum;

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  @BeforeUpdate()
  hasPassword() {
    if (
      this.password &&
      this.password.trim() !== '' &&
      !this.password.startsWith('$2b$')
    ) {
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  }
}
