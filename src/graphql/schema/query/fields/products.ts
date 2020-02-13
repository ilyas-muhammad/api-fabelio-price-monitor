import { ObjectDefinitionBlock } from 'nexus/dist/definitions/objectType';
import { ProductSummary } from '../../type/Product';
import getMany from '../../../../components/product/getMany';
import { intArg, stringArg } from 'nexus/dist';

export default (t: ObjectDefinitionBlock<'Query'>): void => {
  t.field('products', {
    type: ProductSummary,
    args: {
        id: intArg({ nullable: true }),
        url: stringArg({ nullable: true }),
        page: intArg({ nullable: true }),
        itemPerPage: intArg({ nullable: true })
    },
    resolve: async (_, args) => {
      return await getMany(args);
    },
  });
};
