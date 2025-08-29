import {
  DataSource,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'src/shared/generic/repositories/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends GenericRepository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository);
  }

  async findOneGeneric(options: FindOneOptions<User>): Promise<User | null> {
    return this.repository.findOne(options);
  }

  async findManyGeneric(options: FindManyOptions<User>): Promise<User[]> {
    return await this.repository.find(options);
  }
}
