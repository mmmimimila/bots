const isVerifiedEmail = () => true;
export default function getRules() {
  return {
    'users.edit': ({ userId, _id }) =>
      // console.log({userId, _id});
      String(userId) === String(_id),
    'cabinet.access': ({ userId }) => !!userId,
    'cabinet.verifyAccess': async ({ userId }) => {
      const { UserModel } = this.app.models;
      const user = await UserModel.findById(userId);
      if (!user) return false;
      return isVerifiedEmail(user.email);
    },
    'admin.access': async ({ userId }) => {
      const { UserModel } = this.app.models;
      const user = await UserModel.findById(userId);
      if (!user) return false;
      return user.role === 'admin';
    },
  };
}
