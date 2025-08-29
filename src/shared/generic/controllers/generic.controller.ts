// controllers/generic.controller.ts
import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Controller,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { GenericService } from '../services/generic.service';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { GenericEntity } from '../entities/generic.entity';

@Controller()
export abstract class GenericController<T extends GenericEntity> {
  constructor(protected readonly service: GenericService<T>) {}

  @Get()
  @ApiOperation({ summary: 'Lista de registros' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener registro' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nuevo registro' })
  create(@Body() data: DeepPartial<T>) {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar Registro' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: QueryDeepPartialEntity<T>,
  ) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminacion fisica de registro' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Delete('disable/:id')
  @ApiOperation({ summary: 'Eliminacion logica de registro' })
  softDelete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Patch('restore/:id')
  @ApiOperation({ summary: 'Restaurar registro' })
  restore(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
