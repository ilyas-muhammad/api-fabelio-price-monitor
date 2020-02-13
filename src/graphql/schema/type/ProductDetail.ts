import { objectType } from 'nexus';

export const ProductDetail = objectType({
    name: 'ProductDetail',
    definition(t) {
        t.int('id');
        t.string('name');
        t.string('description', { nullable: true });
        t.string('price');
    }
});