import { objectType } from 'nexus';
import { ProductDetail } from './ProductDetail'

export const Product = objectType({
    name: 'Product',
    definition(t) {
        t.int('id');
        t.string('url');
        t.string('createdAt', { nullable: true });
        t.field('productDetail', { type: ProductDetail, nullable: true });
    }
})
export const ProductSummary = objectType({
  name: 'ProductSummary',
  definition(t) {
    t.int('totalCount');
    t.field('data', { type: Product, list: true });
  },
});
