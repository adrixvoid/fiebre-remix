import mongoose from 'mongoose';
import {Product} from '~/types/global.type';
import {slugify} from '~/utils/url';

const Schema = mongoose.Schema;

export const schema = new Schema<Product>(
  {
    title: {type: String, required: true},
    slug: {type: String, required: true},
    price: {type: Number, default: 0},
    priceInCents: {type: Number, default: 0},
    stock: Number,
    priceHidden: {type: Boolean, default: false},
    body: String,
    preview: Object,
    images: [Object],
    downloadUrl: String,
    tags: {type: [String], default: []},
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
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

export default mongoose.model<Product>('Product', schema);
