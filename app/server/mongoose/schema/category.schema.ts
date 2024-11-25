import mongoose from 'mongoose';
import {createPath, slugify} from '~/lib/url';
import {Category} from '~/types/category';

export type CategoryDocument = Category & {
  _id: mongoose.Schema.Types.ObjectId;
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
    active: {type: Boolean, default: true},
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

async function getPathFromParentId(parentId: string) {
  const parentDoc = await mongoose.models.Category.findById(parentId);
  if (parentDoc && parentDoc.path) {
    return createPath(parentDoc.path, parentDoc.slug);
  } else {
    return '/';
  }
}

schema.pre('save', {document: true}, async function (error, doc) {
  if (!this.isNew) {
    return error;
  }

  this.updatedAt = new Date();
  this.slug = slugify(this.name);
  this.path = '';

  if (this.parentId) {
    // Add parent path
    this.path = await getPathFromParentId(this.parentId);
  }
});

schema.post('save', async function (doc) {
  if (doc.parentId) {
    await mongoose.models.Category.findOneAndUpdate(
      {_id: doc.parentId},
      {
        $push: {subcategories: doc._id}
      }
    );
  }
});

schema.pre('findOneAndUpdate', async function () {
  const original = await this.model.findOne(this.getQuery());

  // update subcategory from parent
  if (original.parentId) {
    // remove old parent
    await mongoose.models.Category.findOneAndUpdate(
      {_id: original.parentId},
      {
        $pull: {subcategories: original._id}
      }
    );
  }
});

schema.post('findOneAndUpdate', async function (doc) {
  // update subcategories path
  if (doc.subcategories && doc.subcategories.length > 0) {
    updateSubcategoriesPath(doc.path, doc.subcategories);
  }

  if (doc.parentId) {
    // add new parent
    await mongoose.models.Category.findOneAndUpdate(
      {_id: doc.parentId},
      {
        $push: {subcategories: doc._id}
      }
    );
  }
});

schema.post('findOneAndDelete', async function (doc, next) {
  // Delete parent reference
  if (doc && doc.parentId) {
    await mongoose.models.Category.updateOne(
      {_id: doc.parentId},
      {
        $pull: {subcategories: doc._id}
      }
    );
  }

  next();
});

async function updateSubcategoriesPath(
  newPath: string,
  subcategories: CategoryDocument[] | Category[]
) {
  return Promise.all(
    subcategories.map(async (subcategory) => {
      const doc = await mongoose.models.Category.findOneAndUpdate(
        {
          _id: subcategory.id
        },
        {$set: {path: newPath}},
        {
          new: true
        }
      ).populate('subcategories');

      if (doc) {
        await updateSubcategoriesPath(doc.path, doc.subcategories);
      }
    })
  );
}

export default mongoose.model('Category', schema);
