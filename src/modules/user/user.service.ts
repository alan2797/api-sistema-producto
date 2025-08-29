import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { GenericService } from 'src/shared/generic/services/generic.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessageException } from 'src/constants/message-exception';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async findByUser(user: string) {
    const userData: User | null = await this.userRepository.findOneGeneric({
      where: { user: user },
    });
    return userData;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByUser(createUserDto.user);
    if (user) throw new BadRequestException('El usuario ya existe');
    return await this.userRepository.create(createUserDto);
  }
}
