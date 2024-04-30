import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProductSchema = new Schema(
  {
    title: {type: String, required: true},
    slug: {type: String, required: true},
    price: {type: Number, default: 0},
    stock: Number,
    priceHidden: {type: Boolean, default: false},
    body: String,
    preview: Object,
    images: [Object],
    downloadUrl: String,
    tags: [String],
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    published: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Product', ProductSchema);
