import { AuthenticationError } from 'apollo-server-core';
import { shield } from 'graphql-shield';
import { message } from '../../components/error';
import * as rules from './rules';

export const permissions = shield(
  {
    Query: {
      version: rules.isAllowed('USER_READ'),
    },
    Mutation: {
      upload: rules.isAllowed('USER_READ'),
    },
  },
  {
    fallbackError: new AuthenticationError(message.auth.NOT_AUTHENTICATED),
  },
);
