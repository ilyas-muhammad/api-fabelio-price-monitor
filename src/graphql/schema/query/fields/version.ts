import { ObjectDefinitionBlock } from 'nexus/dist/definitions/objectType';

export default (t: ObjectDefinitionBlock<'Query'>): void => {
  t.field('version', {
    type: 'String',

    resolve: async (_, args) => {
      return '1.0.0';
    },
  });
};
