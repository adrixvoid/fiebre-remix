import mongoose from 'mongoose';
import {slugify} from '~/lib/url';
import {Product} from '~/types/product';

const Schema = mongoose.Schema;

export type ProductDocument = Product & {
  _id: mongoose.Document['_id'];
};

export const schema = new Schema<Product>(
  {
    title: {type: String, required: true},
    description: String,
    slug: {type: String, required: true},
    preview: Object,
    images: [Object],
    price: {type: Number, default: 0},
    priceInCents: {type: Number, default: 0},
    priceHidden: {type: Boolean, default: false},
    productType: {
      type: String,
      enum: ['stock', 'downloadUrl', 'file'],
      required: true
    },
    stock: Number,
    downloadUrl: String,
    file: String,
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    tags: {type: [String], default: []},
    isAvailableForPurchase: {type: Boolean, default: true},
    published: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
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

  if (this.isNew) {
    this.slug = slugify(this.slug || this.title);
  }

  next();
});

export default mongoose.model('Product', schema);
