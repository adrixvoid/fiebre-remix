import {FilterQuery} from 'mongoose';
import {toObjectId} from '~/server/services/mongoose';
import {CategoryDocument} from '~/server/models/schema/category.schema';
import type {Category} from '~/types/global.type';
import {sanitizeUrl} from '~/utils/sanitizeUrl';
import {createPath, slugify} from '~/utils/url';
import categoryModel from './schema/category.schema';

// const db = new MongooseConnect();

export interface Breadcrumb {
  name: string;
  path: string;
  active: boolean;
}

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

const createBreadcrumbPaths = (path: string) => {
  const slugs = path.split('/');
  const temp = [...slugs];
  const response = slugs.map((slug) => {
    const toReturn = [...temp];
    temp.pop();
    return {
      slug: slug,
      path: toReturn.join('/')
    };
  });
  return response.reverse();
};

export const categoryService = {
  model: categoryModel,
  list: async (filter: FilterQuery<CategoryDocument> = {}) => {
    return await categoryModel.find(filter);
  },
  listPopulated: async () => {
    const document = await categoryModel
      .find({
        parentId: null
      })
      .populate({
        path: 'subcategories',
        populate: {
          path: 'subcategories'
        }
      })
      .populate('parent')
      .exec();
    return document;
  },
  listFromPath: async (path: string) => {
    const categories = (await categoryModel
      .find()
      .populate('subcategories')
      .exec()) as CategoryDocument[];

    const category = categories.find(
      (d: CategoryDocument) => d.path === sanitizeUrl(path)
    );

    let breadcrumb = <Breadcrumb[]>{};
    if (category) {
      const breadcrumbPaths = createBreadcrumbPaths(category.path);
      breadcrumb = breadcrumbPaths.map((row) => {
        const found = categories.find((c) => c.path === row.path);
        return {
          path: found?.path || row.path,
          name: found?.name || row.slug,
          active: found?.path === path
        };
      });
    }

    return {category, categories, breadcrumb};
  },
  listEditable: async (id: string) => {
    const categories = await categoryModel
      .find()
      .populate('subcategories')
      .exec();

    const category = categories.find((c) => c.toJSON().id === sanitizeUrl(id));

    let filteredCategories: CategoryDocument[] = [];
    if (category) {
      filteredCategories = categories.filter(
        (c) => !c.path.includes(category.path)
      );
    }

    return {categories: filteredCategories, category};
  },
  find: async (filter: FilterQuery<CategoryDocument> = {}) => {
    let document: CategoryDocument[] | null = [];

    document = await categoryModel.find(filter);

    return document;
  },
  findOne: async (filter: FilterQuery<CategoryDocument> = {}) =>
    await categoryModel.findOne(filter),
  create: async (
    data: Omit<Category, '_id' | 'path' | 'slug' | 'subcategories'>
  ) => {
    const query = {
      name: data.name,
      parentId: data.parentId ? toObjectId(data.parentId) : undefined,
      cover: data.cover || undefined,
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
      cover: data.cover,
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
  },
  delete: async (values: {[k: string]: FormDataEntryValue}) => {
    try {
      const document = await categoryModel.findOneAndDelete({
        _id: values.id
      });

      return document;
    } catch (error) {
      return null;
    }
  }
};
