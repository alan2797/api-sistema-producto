import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DeepPartial, ObjectLiteral } from 'typeorm';
import { GenericRepository } from '../repositories/generic.repository';
import { GenericEntity } from '../entities/generic.entity';

export class GenericService<T extends GenericEntity> {
  constructor(protected readonly repository: GenericRepository<T>) {}

  create(data: DeepPartial<T>) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, data: QueryDeepPartialEntity<T>) {
    return this.repository.update(id, data);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }

  softDelete(id: string): Promise<boolean> {
    return this.repository.softDelete(id);
  }

  restore(id: string): Promise<boolean> {
    return this.repository.restore(id);
  }
}
