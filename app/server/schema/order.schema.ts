import mongoose from 'mongoose';
import {Order} from '~/types/global.type';

const Schema = mongoose.Schema;

export const schema = new Schema<Order>(
  {
    pricePaidInCents: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true
  }
);

schema.set('toJSON', {
  virtuals: true,
  transform: (_, returnObject) => {
    delete returnObject._v;
    return returnObject;
  }
});

schema.pre('save', {document: true}, async function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Order', schema);
