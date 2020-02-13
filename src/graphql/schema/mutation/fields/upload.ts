import { arg } from 'nexus';
import { ObjectDefinitionBlock } from 'nexus/dist/definitions/objectType';
import { generateError } from '../../../../components/error';
import { CLIENT_ERROR } from '../../../../components/error/code';
import { uploadToS3 } from '../../../../lib/AWS/S3';
import { UploadSummary } from '../../type/Upload';

export default (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('upload', {
    type: UploadSummary,
    args: {
      image: arg({ type: 'Upload' }),
    },
    resolve: async (_, args, { dataSources }) => {
      const { createReadStream, mimetype, filename } = await args.image;

      if (
        mimetype !== 'image/png' &&
        mimetype !== 'image/jpg' &&
        mimetype !== 'image/jpeg' &&
        mimetype !== 'image/PNG' &&
        mimetype !== 'image/JPG' &&
        mimetype !== 'image/JPEG'
      ) {
        throw generateError('Wrong file extension!', CLIENT_ERROR);
      }

      const uploadedFilename = await uploadToS3(createReadStream(), filename);

      return {
        filename: uploadedFilename,
      };
    },
  });
};
