import MongooseSchema from '@lskjs/db/MongooseSchema';

/**
 * Company - User - relation
 * @param { db } database
 */
export default ({ db }) => {
  const schema = new MongooseSchema(
    {
      companyId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Company',
      },
      userId: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
      },
      value: {
        type: Number,
      },
      role: {
        type: String,
        // enum: []
      },
    },
    {
      model: 'CompanyUser',
      collection: 'company_user',
    },
  )
    .virtual('user', {
      ref: 'User',
      localField: 'userId',
      foreignField: '_id',
      justOne: true,
    })
    .virtual('company', {
      ref: 'Company',
      localField: 'companyId',
      foreignField: '_id',
      justOne: true,
    });

  return schema;
};
