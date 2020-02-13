import { defaultTo, isNil } from 'ramda';
import { FindManyOptions, Like } from 'typeorm';
import { NexusGenArgTypes, NexusGenEnums } from '../../../nexus-generated-types';
import getRepository from './getRepository';
import Product from '../../models/fabelio-price-monitor/product';

interface Result {
  totalCount: number;
  data: Product[];
}

export default async (options: NexusGenArgTypes['Query']['products']): Promise<Result> => {
  const where: FindManyOptions<Product>['where'] = {};

  if (options.id) {
    where.id = options.id;
  }

  if (options.url) {
    where.url = Like(`%${options.url}%`);
  }

  const itemPerPage = defaultTo(10, options.itemPerPage);
  const page = defaultTo(0, options.page);

  const repository = await getRepository();
  const query = repository.createQueryBuilder('product')
  .leftJoinAndSelect('product.productDetail', 'ProductDetail').where(where);

  const [records, totalCount] = await query
    .skip(page * itemPerPage)
    .take(itemPerPage)
    .getManyAndCount();

  return {
    totalCount,
    data: records,
  };
};
