import { getContent } from "./markdown.server";

export type Product = {
    id: number;
    title: string;
    slug: string;
    price: number;
    priceHidden: boolean;
    preview: string;
    images: string[];
    tags: string[];
    productType: "digital" | "physical";
    url?: string;
    content?: string;
    body?: string;
}

type CharacterMap = { [key: string]: string };

// create a function that returns a slug from a title
export function slugify(title: string): string {
    const map: CharacterMap = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ñ': 'n',
    };

    let slug = title.toLowerCase();

    for (let character in map) {
        let re = new RegExp(character, 'g');
        slug = slug.replace(re, map[character]);
    }

    slug = slug.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    return slug.replace(/\s/g, '-');
}

export function getProducts(): Product[] {
    return [{
        id: 1,
        title: 'Plantillas GRATIS - Canva',
        slug: slugify('Plantillas GRATIS - Canva'),
        price: 0.00,
        priceHidden: false,
        productType: 'digital',
        preview: 'https://d22fxaf9t8d39k.cloudfront.net/7f4ba06e2593e3c50887fb2a0d0faa1bdddf8023b487ed696c5d81cb7b4589be152326.jpg',
        images: [],
        tags: ['']
    }, {
        id: 2,
        title: 'Asesoría personalizada',
        slug: slugify('Asesoría personalizada'),
        productType: 'digital',
        price: 0.00,
        priceHidden: true,
        preview: 'https://d22fxaf9t8d39k.cloudfront.net/868e0ef5ebe2b18ab58af2e429b7d4e02e5f9d5d8426d140e894ee9f7d018bd1152326.jpg',
        images: [],
        tags: [''],
    }, {
        id: 3,
        title: 'Planners 2023 - GRATIS!',
        slug: slugify('Planners 2023 - GRATIS!'),
        productType: 'digital',
        url: 'https://drive.google.com/drive/folders/17OxvIYMHkWNcaFRUjPFdi3bWOoXK2Cxs',
        price: 0.00,
        priceHidden: false,
        preview: 'https://d22fxaf9t8d39k.cloudfront.net/1aedb6928026783077b7029ff1931dd5c7f54b8f3de612946a1873d0650813c6152326.jpg',
        images: [
            'https://d22fxaf9t8d39k.cloudfront.net/1aedb6928026783077b7029ff1931dd5c7f54b8f3de612946a1873d0650813c6152326.jpg',
            'https://d22fxaf9t8d39k.cloudfront.net/e68b43a8b5f69e2d47c5c0db42e457e695a67a51fe6d1df857802fc7a9ba141d152326.jpeg',
            'https://d22fxaf9t8d39k.cloudfront.net/9bf533f3c841bc799fe49c03c2e05ace2ac9c95f707c3544360b32032036f36c152326.jpeg',
            'https://d22fxaf9t8d39k.cloudfront.net/b9a86e442f8a3f619f4e8b487ba8f1db7ebf0a6db211ccf6cfd18fa1672cab91152326.jpeg',
            'https://d22fxaf9t8d39k.cloudfront.net/1fc13dfee4868968e9768fe87d8c82706f54f6538c5eecc072e598c0c79e6433152326.jpeg'
        ],
        tags: ['gratis'],
    }, {
        id: 4,
        title: 'Pink Kit - Plantillas para redes',
        slug: slugify('Pink Kit - Plantillas para redes'),
        productType: 'digital',
        url: '',
        price: 3600.00,
        priceHidden: false,
        preview: 'https://d22fxaf9t8d39k.cloudfront.net/314159f5d672dbaf671e7492cb76ebbfda4c99b2626a2552ff8406772a60b878152326.png',
        images: [
            'https://d22fxaf9t8d39k.cloudfront.net/314159f5d672dbaf671e7492cb76ebbfda4c99b2626a2552ff8406772a60b878152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/c1dd3aa1c42fc5a02264fef9bd2eb673fece9c3dea85087dbb4ea9e5aa8cdf4c152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/a391a55ea9f7e65c41e8a2b4efd149da84532f8d242e559cd1ecfd0fd848e7a3152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/0396cbb7aa33b8fd952e64a2131b14db2da835cf995bc66899a9159b2e686b44152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/110fe188f83515ca66e74b7224c1e2c3aa6989c9cae3937f5141329d4bf95151152326.png',
        ],
        tags: [
            'plantillas',
            'instagram',
            'pink kit',
        ],
    }, {
        id: 5,
        title: 'Vaporwave - Plantillas para redes',
        slug: slugify('Vaporwave - Plantillas para redes'),
        productType: 'digital',
        url: '',
        price: 4000.00,
        priceHidden: false,
        preview: 'https://d22fxaf9t8d39k.cloudfront.net/a79ca5c1df7ccaa1cdbaa97deb4df729932861e20b28c7ff1772123a8d5e98f7152326.png',
        images: [
            'https://d22fxaf9t8d39k.cloudfront.net/a79ca5c1df7ccaa1cdbaa97deb4df729932861e20b28c7ff1772123a8d5e98f7152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/bda9f71b6ad1d9c68df20ee11774ac5d0eba6525da78187e10437819597aad6f152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/1c46be4859bd3019a9ad2849909ef34bb884854c0d9a906effa9d4065aafb5f3152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/7881f9937776d814939f984fe96fd30fe55f68574de75a96af9f621961282d23152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/fe022474a98976f7281f50145fe461a5c22e15e1647e2190be1b66dedc043a8a152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/2a1e49ac96d786315e667cbe7ca7c640e9d1f4c0682c30a7a46a8f189dd61d49152326.png'
        ],
        tags: ['plantillas', 'vaporwave'],
    }, {
        id: 6,
        title: 'Flower Power - Kit de dibujos',
        slug: slugify('Flower Power - Kit de dibujos'),
        productType: 'digital',
        url: '',
        price: 3600.00,
        priceHidden: false,
        preview: 'https://d22fxaf9t8d39k.cloudfront.net/76211a877d2e7b0a6f3b323f16dbc60d9db523ce05977c92caf6a286b294c7ee152326.png',
        images: [
            'https://d22fxaf9t8d39k.cloudfront.net/76211a877d2e7b0a6f3b323f16dbc60d9db523ce05977c92caf6a286b294c7ee152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/52ce3bca0259e7ed198274946eaa36ae25d3d88fbd263641d4482ab85863bb21152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/a1e3391aca8c394e056a9e4f6d9972c3a504f41a352b1e8c1e87a108e5a4d21a152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/d4cc2a2ab60a9b113408f0dd61a5597a614e324748c5a9821691f5fe08309e3f152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/e80de787fa18388d045ab975804b05f5e7f211b8ba120c7be709e93fafb322d4152326.png',
            'https://d22fxaf9t8d39k.cloudfront.net/c37500aa7b8f967e8c51327c3b36d62600150a9271253e8484d598b62a54dc24152326.png'
        ],
        tags: [''],
    }];
}

export async function getProduct(slug: string) {
    const product = getProducts().find(product => product.slug === slug);

    if (!product) {
        throw new Error('Product not found');
    }

    const markdownResult = await getContent('products', slug)

    return {
        ...markdownResult,
        ...product
    };
}
