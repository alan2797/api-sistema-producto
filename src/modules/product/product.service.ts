import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/shared/generic/services/generic.service';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProductService extends GenericService<Product> {
  constructor(private readonly productRepository: ProductRepository) {
    super(productRepository);
  }

  async findProductsPaginate(page = 1, limit = 5) {
    const take = limit > 0 ? limit : 5;
    const skip = (page - 1) * take;

    const [data, total] = await this.productRepository.repository.findAndCount({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return {
      total,
      page,
      limit: take,
      totalPages: Math.ceil(total / take),
      data,
    };
  }

  async findAllByUser(user: User) {
    return await this.productRepository.repository.find({
      where: { userId: user.id },
    });
  }
}
