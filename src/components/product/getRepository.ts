import { Repository } from 'typeorm';
import { getConnection } from '../../models/fabelio-price-monitor/getConnection';
import Product from '../../models/fabelio-price-monitor/product';

export default async (): Promise<Repository<Product>> => {
  const connection = await getConnection();

  return connection.getRepository(Product);
};
