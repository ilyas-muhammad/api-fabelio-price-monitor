import { mutationType } from 'nexus';
import createProduct from './fields/product/create';

export const Mutation = mutationType({
  definition(t) {
    createProduct(t);
  },
});
