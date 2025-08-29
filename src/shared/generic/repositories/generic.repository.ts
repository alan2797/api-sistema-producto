// repositories/typeorm-generic.repository.ts
import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindOneOptions,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GenericEntity } from '../entities/generic.entity';

@Injectable()
export class GenericRepository<T extends GenericEntity> {
  constructor(public readonly repository: Repository<T>) {}

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<T> {
    return this.repository.findOneOrFail({ where: { id } as any });
  }

  create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data); // ✅ ahora sí compatible
    return this.repository.save(entity);
  }

  findOneWithCategories(id: string): Promise<T> {
    return this.repository.findOneOrFail({
      where: { id } as any,
      relations: ['categories'],
    });
  }

  async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected || 0) > 0;
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);

    return (result.affected || 0) > 0;
  }

  async restore(id: string): Promise<boolean> {
    const result = await this.repository.restore(id);
    return (result.affected || 0) > 0;
  }
}
