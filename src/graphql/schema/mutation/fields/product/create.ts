import { stringArg, arg } from 'nexus';
import { ObjectDefinitionBlock } from 'nexus/dist/definitions/objectType';
import { Product } from '../../../type/Product';
import createProduct from '../../../../../components/product/create';

export default (t: ObjectDefinitionBlock<'Mutation'>): void => {
  t.field('createProduct', {
    type: Product,
    args: {
      url: stringArg({ required: true }),
    },
    resolve: async (_, args) => {
      return createProduct(args);
    },
  });
};
