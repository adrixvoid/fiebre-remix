import mongoose from 'mongoose';
import {slugify} from '~/lib/url';
import {Product, PRODUCT_TYPE} from '~/types/product';

const Schema = mongoose.Schema;

export type ProductDocument = Product & {
  _id: mongoose.Schema.Types.ObjectId;
  categoryId: {type: mongoose.Schema.Types.ObjectId; ref: 'Category'};
};

export const schema = new Schema<ProductDocument>(
  {
    name: {type: String, required: true},
    description: String,
    priceHidden: {type: Boolean, default: false},
    priceInCents: {type: Number, default: 0},
    images: [Object],
    primaryImage: Number,
    tags: {type: [String], default: []},
    published: {type: Boolean, default: false},
    slug: {type: String, required: true},

    productType: {
      type: String,
      enum: PRODUCT_TYPE,
      required: true
    },
    stock: {type: Number, default: 0},
    externalUrl: String,
    storedFile: String,

    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
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
    this.slug = slugify(this.slug || this.name);
  }

  next();
});

export default mongoose.model('Product', schema);
