import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const ShoppingCartSchema = new Schema(
  {
    userId: {type: ObjectId, required: true},
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    createdAt: Date,
    updatedAt: {type: Date, default: Date.now}
  },
  {
    timestamps: true
  }
);

export default mongoose.model('ShoppingCart', ShoppingCartSchema);
