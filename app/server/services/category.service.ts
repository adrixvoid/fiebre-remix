import {createPath, slugify} from '~/lib/url';
import type {Category} from '~/types/category';
import {MapImage} from '~/types/file';

async function getParentPath(parentId: string) {
  const parent = await prisma.category.findUnique({
    where: {id: parentId}
  });

  if (parent?.path) {
    return parent.path;
  } else {
    return undefined;
  }
}

export const categoryService = {
  findByPath: async (path: string) => {
    const category = await prisma.category.findFirst({
      where: {path},
      include: {
        subcategories: true
      }
    });

    if (!category) {
      return null;
    }

    let subcategories;
    if (category.subcategories) {
      subcategories = category.subcategories.map((category) => ({
        ...category,
        image: category.image ? (JSON.parse(category.image) as MapImage) : null
      }));
    }

    return {
      ...category,
      subcategories,
      image: category?.image ? (JSON.parse(category.image) as MapImage) : null
    };
  },
  findManyByPath: async (path: string) => {
    let where = {};
    if (path) {
      where = {path};
    } else {
      where = {parentId: null};
    }
    const categories = await prisma.category.findMany({
      where,
      include: {
        subcategories: true
      }
    });
    return categories.map((category) => ({
      ...category,
      image: category.image ? (JSON.parse(category.image) as MapImage) : null
    }));
  },
  find: async (id: string) => {
    const category = await prisma.category.findUnique({
      where: {id}
    });

    if (category?.image) {
      Object.assign(category, {image: JSON.parse(category.image)});
    }

    return category;
  },
  findMany: async () => {
    const categories = await prisma.category.findMany();
    return categories.map((category) => ({
      ...category,
      image: category.image ? (JSON.parse(category.image) as MapImage) : null
    }));
  },
  create: async (
    data: Omit<Category, '_id' | 'id' | 'path' | 'slug' | 'subcategories'>
  ) => {
    let path = slugify(data.name);

    if (data.parentId) {
      const parentPath = await getParentPath(data.parentId);
      path = createPath(parentPath || '', slugify(data.name));
    }

    const doc = await prisma?.category.create({
      data: {
        name: data.name,
        image: JSON.stringify(data.image),
        path: path,
        slug: slugify(data.name),
        active: data.active,
        parentId: data.parentId ? data.parentId : null
      }
    });

    if (!doc) {
      throw new Error('Could not save the record');
    }

    return doc;
  },
  update: async (data: Omit<Category, 'id' | 'path'>, id: string) => {
    let path = undefined;

    if (data.parentId) {
      const parentPath = await getParentPath(data.parentId);
      path = createPath(parentPath || '', slugify(data.name));
    } else {
      path = slugify(data.name);
    }

    const original = await prisma.category.findUnique({
      where: {id},
      include: {
        subcategories: true
      }
    });
    const isNewPath =
      original?.name !== data.name || original.parentId !== data.parentId;
    const hasSubcategories =
      original?.subcategories && original?.subcategories.length > 0;

    const doc = await prisma?.category.update({
      data: {
        name: data.name,
        image: JSON.stringify(data.image),
        path: path,
        slug: slugify(data.name),
        active: data.active,
        parentId: data.parentId ? data.parentId : null
      },
      where: {id}
    });

    if (!doc) {
      throw new Error('Could not update the record');
    }

    if (isNewPath && hasSubcategories && original?.path) {
      original.subcategories.map(async (s) => {
        const newPath = s.path?.replace(original.path || '', doc.path || '');

        await prisma.category.update({
          data: {
            path: newPath
          },
          where: {id: s.id}
        });
      });
    }

    return doc;
  },
  delete: async (id: string) => {
    const doc = await prisma.category.delete({
      where: {id}
    });

    if (!doc) {
      throw new Error('Could not delete the record');
    }

    return doc;
  },
  // update: async (values: {[k: string]: FormDataEntryValue}) => {
  findMongoose: async (path: string) => {
    // const list = await categoryModel.find({
    //   parentId: null
    // });
  },
  findManyMongoose: async () => {
    // return await categoryModel.find();
  },
  findByPathMongoose: async (path: string) => {
    // return productModel.find().lean();
    // if (Boolean(path)) {
    // const pathSplitted = path.split('/');
    // const slug = pathSplitted.pop();
    // const reducedPath = pathSplitted.join('/');
    // }
    // path: pathSplitted.join('/'),
  },
  createMongoose: async (
    data: Omit<Category, '_id' | 'id' | 'path' | 'slug' | 'subcategories'>
  ) => {
    // create
    // const doc = await categoryModel.create({
    //   name: data.name,
    //   image: data.image || undefined,
    //   path: slugify(data.name),
    //   slug: slugify(data.name),
    //   active: data.active,
    //   parentId: data.parentId ? toObjectId(data.parentId as string) : null
    // });
    // if (!doc) {
    //   throw new Error('Could not save the record');
    // }
    // return doc;
  },
  updateMongoose: async (id: string) => {
    // const doc = await categoryModel.findOneAndUpdate(
    //   {
    //     _id: toObjectId(id)
    //   },
    //   {
    //     $set: {
    //       name: data.name,
    //       image: data.image,
    //       parentId: data.parentId ? toObjectId(data.parentId) : null,
    //       path: path,
    //       slug: slugify(data.name)
    //     }
    //   },
    //   {
    //     new: true
    //   }
    // );
    // if (!doc) {
    //   throw new Error('Could not update: document not found');
    // }
    // return doc;
  },
  deleteMongoose: async (id: string) => {
    // const deletedCategory = await categoryModel.findOneAndDelete({
    //   _id: id
    // });
  }
};
