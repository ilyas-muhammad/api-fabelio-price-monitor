import * as Winston from 'winston';
import { getConsoleDriver } from './driver/getConsoleDriver';
import { getElasticSearchDriver } from './driver/getElasticsearchDriver';

const { combine, json, timestamp } = Winston.format;

type LogDriverEnum = 'CONSOLE' | 'ELASTICSEARCH';

export default (driver: LogDriverEnum): Winston.Logger => {
  const logDriverMap = {
    CONSOLE: getConsoleDriver,
    ELASTICSEARCH: getElasticSearchDriver,
  };

  const logDriver = logDriverMap[driver]();

  return Winston.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    exceptionHandlers: logDriver.exceptionHandlers,
    transports: logDriver.transports,
  });
};
