import type { ActionFunctionArgs } from "@remix-run/node";

export async function loader() {
    throw new Response("Oh no! Something went wrong!", {
        // access denied status
        status: 401,
    });
}

export const action = async ({ request }: ActionFunctionArgs) => {
    let formData = await request.formData();
    let values = Object.fromEntries(formData);
    // basket?.action?.addItem({
    //     id: values.id,
    //     quantity: values.quantity,
    // });

    // const errors = await validateRecipeFormData(formData);
    // if (errors) {
    //     return json({ errors });
    // }

    return { status: "ok", data: values };
};
