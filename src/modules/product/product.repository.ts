import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'src/shared/generic/repositories/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { PaginationResponseDto } from 'src/shared/dto/PaginationResponseDto.dto';
import { ProductType } from './enums/type-product.enum';

@Injectable()
export class ProductRepository extends GenericRepository<Product> {
  constructor(
    @InjectRepository(Product)
    repository: Repository<Product>,
  ) {
    super(repository);
  }

  async findProductsWithFiltersV2(
    profileId: string,
    page: number = 1,
    limit: number = 10,
    categoryIds?: string[],
    subcategoryIds?: string[],
    filterIds?: string[],
    search?: string,
    type?: ProductType,
  ): Promise<PaginationResponseDto<any>> {
    // Construir la consulta base
    const query = this.repository
      .createQueryBuilder('p')
      .select([
        'p.id as product_id',
        'p.name as product_name',
        'p.type as product_type',
        'p.description as product_description',
        'p.price',
        's.id as shop_id',
        's.name as shop_name',
        's.description as shop_description',
        's.banner as shop_image',
      ])
      .addSelect(
        `
        CASE 
          WHEN EXISTS (
            SELECT 1 
            FROM shop_category sc2 
            JOIN category c2 ON sc2.category_id = c2.id
            WHERE sc2.shop_id = s.id 
            AND c2.id IN (
              SELECT category_id 
              FROM profile_category 
              WHERE profile_id = :profileId
            )
          ) THEN 1 
          ELSE 2 
        END`,
        'prioridad',
      )
      .addSelect(
        `
        CASE 
          WHEN pp.product_id IS NOT NULL THEN 1 
          ELSE 0 
        END`,
        'en_promocion',
      )
      .addSelect('pr.title', 'promotion_name')
      .addSelect('pr.discount', 'discount')
      .addSelect('pr.type_discount', 'type_discount')
      .addSelect(
        `(
        SELECT STRING_AGG(pf.url, ',')
        FROM file pf
        WHERE pf.product_id = p.id
        LIMIT 5
      )`,
        'product_images',
      )
      .innerJoin('p.shop', 's')
      .leftJoin('promotion_product', 'pp', 'p.id = pp.product_id')
      .leftJoin(
        'promotion',
        'pr',
        'pp.promotion_id = pr.id AND pr.start_date <= NOW() AND pr.end_date >= NOW()',
      )
      .leftJoin('shop_category', 'sc', 's.id = sc.shop_id')
      .leftJoin('category', 'c', 'sc.category_id = c.id')
      .leftJoin('filter_category', 'fc', 'c.id = fc.category_id')
      .leftJoin('filter', 'f', 'fc.filter_id = f.id')
      .where('1=1')
      .setParameter('profileId', profileId)
      .setParameter('type', type);

    if (type) {
      query.andWhere('p.type = :type', { type });
    }

    if (subcategoryIds?.length) {
      query.andWhere('c.id IN (:...subcategoryIds)', { subcategoryIds });
    } else if (categoryIds?.length) {
      query.andWhere('c.id IN (:...categoryIds)', { categoryIds });
    }

    if (filterIds?.length) {
      query.andWhere('f.id IN (:...filterIds)', { filterIds });
    }

    // Filtro único de búsqueda (producto O comercio)
    if (search?.trim()) {
      const searchTerm = `%${search.trim()}%`;
      query.andWhere(
        '(unaccent(p.name) ILIKE unaccent(:searchTerm) OR unaccent(s.name) ILIKE unaccent(:searchTerm))',
        {
          searchTerm,
        },
      );
    }

    query.distinct(true);

    // Ordenamiento
    query.orderBy('prioridad', 'ASC');
    query.addOrderBy('en_promocion', 'ASC');
    query.addOrderBy('s.name', 'ASC');
    query.addOrderBy('p.name', 'ASC');

    // Obtener el total de registros
    const total = await query.getCount();

    // Calcular total de páginas
    const totalPages = Math.ceil(total / limit);

    // Aplicar paginación
    query.offset((page - 1) * limit).limit(limit);

    // Obtener la consulta SQL y los parámetros
    const [sql, parameters] = query.getQueryAndParameters();

    // Formatear la consulta SQL con los parámetros para poder ejecutarla directamente
    let fullSql = sql;
    parameters.forEach((param, index) => {
      fullSql = fullSql.replace(
        `$${index + 1}`,
        typeof param === 'string' ? `'${param}'` : param,
      );
    });

    console.log('Consulta SQL completa:');
    console.log(fullSql);

    // Obtener los datos
    const data = await query.getRawMany();

    // Retornar la respuesta estructurada
    return {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages,
      data,
    };
  }
}
