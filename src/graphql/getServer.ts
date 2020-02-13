import { ApolloServer } from 'apollo-server-express';
import getSchema from './getSchema';

const getServer = () => {
  const schema = getSchema();

  return new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    cacheControl: false,
  });
};

export default getServer;
