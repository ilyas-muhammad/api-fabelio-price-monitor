import { Connection, createConnection } from 'typeorm';
import { getValidatedBooleanConfig, getValidatedConfig, getValidatedNumericConfig } from '../../lib/config';

import product from './product';
import productDetail from './productDetail';

let connection: Connection | undefined;

export const getConnection = async (): Promise<Connection> => {
  if (connection) {
    return connection;
  }

  const host = getValidatedConfig('DB_LEGACY_HOST');
  const port = getValidatedNumericConfig('DB_LEGACY_PORT');
  const username = getValidatedConfig('DB_LEGACY_USERNAME');
  const password = getValidatedConfig('DB_LEGACY_PASSWORD');
  const database = getValidatedConfig('DB_LEGACY_DATABASE');
  const logging = getValidatedBooleanConfig('DB_LEGACY_LOGGING');

  connection = await createConnection({
    host,
    port,
    username,
    password,
    database,
    logging,
    name: 'fabelio-price-monitor',
    type: 'mysql',
    entities: [
        product,
        productDetail,
    ],
    logger: 'advanced-console',
  });

  return connection;
};