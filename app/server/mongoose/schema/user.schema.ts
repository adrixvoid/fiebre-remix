import mongoose from 'mongoose';

export const schema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {
      type: String,
      minLength: 10,
      required: true,
      lowercase: true
    },
    passwordHASH: {type: Object, default: null},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
    // use bcrypt
    // const passwordHash = await bcrypt.hash(password, saltRounds)
    // cart: [
    //   {type: mongoose.Schema.Types.ObjectId, ref: 'Cart', default: {}}
    // ],
  },
  {
    timestamps: true
  }
);

schema.set('toJSON', {
  transform: (_, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject._v;
    delete returnObject.passwordHASH;
    delete returnObject.password;
    return returnObject;
  }
});

export default mongoose.model('User', schema);
