import { Repository } from 'typeorm';
import { getConnection } from '../../models/fabelio-price-monitor/getConnection';
import ProductDetail from '../../models/fabelio-price-monitor/productDetail';

export default async (): Promise<Repository<ProductDetail>> => {
  const connection = await getConnection();

  return connection.getRepository(ProductDetail);
};
