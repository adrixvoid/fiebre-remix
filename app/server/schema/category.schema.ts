import mongoose from 'mongoose';
import {createPath, slugify} from '~/lib/url';
import {Category} from '~/types/category';

export type CategoryDocument = Category & {
  _id: mongoose.Document['_id'];
  parent?: CategoryDocument;
  subcategories: CategoryDocument[];
};

export const schema = new mongoose.Schema<CategoryDocument>(
  {
    name: {type: String, required: true},
    image: {type: Object, default: null},
    slug: {type: String, required: true},
    path: {type: String, required: true, unique: true},
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },
    subcategories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    published: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
  },
  {
    timestamps: true
  }
);

schema.virtual('parent', {
  ref: 'Category',
  localField: 'parentId',
  foreignField: '_id',
  justOne: true
});

schema.set('toJSON', {
  virtuals: true,
  transform: (_, returnObject) => {
    delete returnObject._v;
    return returnObject;
  }
});

schema.pre('save', {document: true}, async function (next) {
  try {
    if (!this.isNew) {
      next();
      return;
    }

    this.updatedAt = new Date();
    this.slug = slugify(this.name);
    this.path = this.slug;

    // Add parent path
    if (this.parentId) {
      const parentDoc = await mongoose.models.Category.findById(this.parentId);
      if (parentDoc && parentDoc.path) {
        this.path = createPath(parentDoc?.path, this.slug);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

schema.post('findOneAndDelete', async function (doc) {
  // Delete parent reference
  if (doc && doc.parentId) {
    await mongoose.models.Category.updateOne(
      {_id: doc.parentId},
      {
        $pull: {subcategories: doc._id}
      }
    );
  }

  // Delete subfolder reference
});

export default mongoose.model('Category', schema);
