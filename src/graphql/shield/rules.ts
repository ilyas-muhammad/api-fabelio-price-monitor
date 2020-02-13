import { AuthenticationError, ForbiddenError } from 'apollo-server';
import { rule } from 'graphql-shield';
import { contains, isNil } from 'ramda';
import { Rule } from 'graphql-shield/dist/rules';
import generateAuthenticatedError from '../../components/error/generateAuthenticatedError';

export const isAuthenticated = rule()(
  async (parent, args, ctx, info): Promise<true | AuthenticationError> => {
    const user = await ctx.user;

    if (isNil(user)) {
      return generateAuthenticatedError();
    }

    return true;
  },
);

export const isAllowed = (permission: string): Rule => {
  const resolve = async (
    parent: unknown,
    args: unknown,
    // ctx: Context,
    info: unknown,
  ): Promise<true | AuthenticationError | ForbiddenError> => {

    return true;
  };

  return rule()(resolve);
};
