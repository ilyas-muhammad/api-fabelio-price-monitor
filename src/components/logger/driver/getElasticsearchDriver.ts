import * as Elasticsearch from 'elasticsearch';
import * as ElasticsearchTransport from 'winston-elasticsearch';
import { Driver } from '../index';

let driver: Driver;

export const getElasticSearchDriver = () => {
  if (driver) {
    return driver;
  }

  const client = new Elasticsearch.Client({
    apiVersion: '6.5',
    hosts: [
      {
        host: process.env.ELASTICSEARCH_HOST,
        auth: `${process.env.ELASTICSEARCH_USER}:${process.env.ELASTICSEARCH_PASSWORD}`,
        protocol: 'https',
        port: process.env.ELASTICSEARCH_PORT,
      },
    ],
  });

  // tslint:disable-next-line: no-any
  const WinstonElasticsearchTransport: any = ElasticsearchTransport;

  const elasticsearchTransport = new WinstonElasticsearchTransport({
    client,
    level: 'info',
    indexPrefix: process.env.ELASTICSEARCH_LOG_INDEX_PREFIX,
  });

  driver = {
    exceptionHandlers: [elasticsearchTransport],
    transports: [elasticsearchTransport],
  };

  return driver;
};
