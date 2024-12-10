export const shoppingCartService = {
  update: async (form: {[k: string]: FormDataEntryValue}) => {
    return null;
    // const model = await shoppingCartModel.findById(form.id);
    // if (!model) {
    //   throw new Error('Shopping cart not found');
    // }
    // // model.products = form.products;
    // await model.save();
    // return model;
  },
  delete: async (form: {[k: string]: FormDataEntryValue}) => {
    return null;
    // const model = await shoppingCartModel.findById(form.id);
    // if (model) {
    //   await model?.deleteOne();
    // }
    // return model;
  },
  create: async (form: {[k: string]: FormDataEntryValue}) => {
    return null;
    // const model = await shoppingCartModel.create(form);
    // if (!model) {
    //   throw new Error('Shopping cart not found');
    // }
    // console.log(model.baseModelName, model.model, model.get('products'));
    // return model;
  },
  find: async () => {
    return null;
    // mongo
    // const model = await shoppingCartModel.find();
    // return model;
  }
};

export async function shoppingCartAction(request: Request) {
  try {
    let formData = await request.formData();
    let form = Object.fromEntries(formData);

    switch (request.method) {
      case 'PATCH':
        return await shoppingCartService.update(form);
      case 'POST':
        return await shoppingCartService.create(form);
      case 'DELETE':
        return await shoppingCartService.delete(form);
      case 'GET':
        return await shoppingCartService.find();
      default:
        return null;
    }
  } catch (e) {
    console.error('SHOPPING-CART', e.message);
  }
}
