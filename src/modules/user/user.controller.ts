import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ApiArrayResponse } from 'src/shared/decorators/api-array-response.decorator';
import { ApiObjResponse } from 'src/shared/decorators/api-obj-response';
import { GenericController } from 'src/shared/generic/controllers/generic.controller';
import { Public } from 'src/shared/decorators/public.decorator';

@ApiExtraModels(User)
@ApiTags('User')
@Controller('user')
export class UserController extends GenericController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Get()
  @ApiArrayResponse(User)
  findAll() {
    return super.findAll();
  }

  @Post()
  @ApiObjResponse(User)
  create(@Body() data: CreateUserDto) {
    return super.create(data);
  }

  @Put(':id')
  @ApiObjResponse(User)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return super.update(id, updateUserDto);
  }

  @Get(':id')
  @ApiObjResponse(User)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return super.findOne(id);
  }

  @Delete(':id')
  @ApiObjResponse(Boolean)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return super.delete(id);
  }
}
