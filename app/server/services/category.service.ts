import {createPath, slugify} from '~/lib/url';
import {toObjectId} from '~/server/lib/mongoose';
import {CategoryDocument} from '~/server/schema/category.schema';
import type {Category} from '~/types/category';
import categoryModel from '../schema/category.schema';

async function updateSubcategoriesPath(
  newPath: string,
  subcategories: CategoryDocument[] | Category[]
) {
  return Promise.all(
    subcategories.map(async (category) => {
      const doc = await categoryModel
        .findOneAndUpdate(
          {
            _id: category._id
          },
          {$set: {path: createPath(newPath, category.slug)}},
          {
            new: true
          }
        )
        .populate('subcategories');

      if (doc) {
        await updateSubcategoriesPath(doc.path, doc.subcategories);
      }
    })
  );
}

export const categoryService = {
  create: async (
    data: Omit<Category, '_id' | 'path' | 'slug' | 'subcategories'>
  ) => {
    const query = {
      name: data.name,
      parentId: data.parentId ? toObjectId(data.parentId) : undefined,
      image: data.image || undefined,
      path: slugify(data.name),
      slug: slugify(data.name)
    };

    // create
    const doc = await categoryModel.create(query);

    if (!doc) {
      throw new Error('Could not save the record');
    }

    // add new subcategory in parent
    if (query.parentId) {
      await categoryModel.findOneAndUpdate(
        {_id: query.parentId},
        {
          $push: {subcategories: doc._id}
        }
      );
    }

    return doc;
  },
  // update: async (values: {[k: string]: FormDataEntryValue}) => {
  update: async (data: Omit<Category, 'path' | 'slug'> & {id: string}) => {
    const original = await categoryModel
      .findById(toObjectId(data.id))
      .populate('subcategories');

    if (!original) {
      throw 'The document does not exist';
    }

    // @TODO: add type validator
    const query = {
      name: data.name,
      image: data.image,
      parentId: data.parentId ? toObjectId(data.parentId) : undefined,
      path: slugify(data.name),
      slug: slugify(data.name)
    };

    // Assign new path
    if (data.parentId !== original.parentId) {
      const parentDoc = await categoryModel.findById(query.parentId);
      if (parentDoc?.path) {
        query.path = createPath(parentDoc.path, query.name);
      }
    }

    // update
    const doc = await categoryModel.findOneAndUpdate(
      {
        _id: toObjectId(data.id)
      },
      {
        $set: query
      },
      {
        new: true
      }
    );

    if (!doc) {
      throw new Error('Could not update: document not found');
    }

    // update subcategories path
    if (original.subcategories && original.subcategories.length > 0) {
      updateSubcategoriesPath(query.path, original.subcategories);
    }

    // update subcategory from parent
    if (data.parentId !== original.parentId) {
      // remove old parent
      await categoryModel.findOneAndUpdate(
        {_id: query.parentId},
        {
          $pull: {subcategories: original._id}
        }
      );

      // add new parent
      await categoryModel.findOneAndUpdate(
        {_id: query.parentId},
        {
          $push: {subcategories: original._id}
        }
      );
    }

    return doc;
  }
};
