import { queryType } from 'nexus';
import version from './fields/version';
import products from './fields/products';

export const Query = queryType({
  definition(t) {
    version(t);
    products(t);
  },
});
