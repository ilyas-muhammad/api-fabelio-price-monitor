import { code, generateError } from '../error';
import { logError } from '../logger';
import { mergeAll, values } from 'ramda';
import { validate } from 'class-validator';
import { format } from 'date-fns';
import generateFormValidationError from '../error/generateFormValidationError';
import getRepository from './getRepository';
import getPDetailRepository from '../productDetail/getRepository';
import Product from '../../models/fabelio-price-monitor/product';
import ProductDetail from '../../models/fabelio-price-monitor/productDetail';
import Axios from 'axios';

interface Args {
  url: string;
}

export default async (args: Args): Promise<any> => {
  const { CLIENT_ERROR, SERVER_ERROR } = code;
  const repo = await getRepository();
  const repoPDetail = await getPDetailRepository();

  const duplicate = await repo.findOne({
    where: { url: args.url },
  });

  if (duplicate) {
    throw generateError('Url is exist, please use another url', CLIENT_ERROR);
  }

  const cheerio = require('cheerio');
  const fetchData = async () => {
    const result = await Axios.get(args.url);
    return cheerio.load(result.data, {
        normalizeWhiteSpace: true,
    });
  };

  const $ = await fetchData();
  const price = $('span[class=price]').html();
  const title = $('span[class=base]').html();
  const description = $('div[id=description]').text();
  
  const recordPDetail = new ProductDetail();
  recordPDetail.name = title;
  recordPDetail.description = description;
  recordPDetail.price = price;

  const insertedPDetail = await repoPDetail
  .insert(recordPDetail)

  .catch((error) => {
    logError('Failed to save product detail', {
      errorStack: error.stack,
    });

    throw generateError('Failed to save product detail', SERVER_ERROR);
  });

  const record = new Product();
  record.url = args.url;
  record.productDetailId = insertedPDetail.identifiers[0].id;
//   record.createdAt = format(new Date(), 'yyyy-dd-MM HH:mm:ss');

  const errors = await validate(record, { validationError: { target: false } });

  if (errors.length > 0) {
    const err = mergeAll(
      errors.map((error) => {
        return {
          [error.property]: values(error.constraints),
        };
      }),
    );

    throw generateFormValidationError(err);
  }

  const insertProduct = await repo
    .save(record)

    .catch((error) => {
      logError('Failed to save product', {
        errorStack: error.stack,
      });

      throw generateError('Failed to save product', SERVER_ERROR);
    });

  return {
      ...record,
      id: record.id,
      url: args.url,
      createdAt: format(new Date(), 'yyyy-dd-MM HH:mm:ss'),
  };
};
