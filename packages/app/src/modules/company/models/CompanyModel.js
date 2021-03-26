import MongooseSchema from '@lskjs/db/MongooseSchema';
//
export default ({ db }) => {
  const schema = new MongooseSchema(
    {
      ownerUserId: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    {
      model: 'Company',
      collection: 'company',
    },
  ).virtual('ownerUser', {
    ref: 'User',
    localField: 'ownerUserId',
    foreignField: '_id',
    justOne: true,
  });

  return schema;
};
