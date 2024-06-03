import {Breadcrumb} from '~/types/global.type';

export function toPathObject(slugs: string[]) {
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
}

export function getBreadcrumb<
  GenericData extends {path: string; slug: string; name: string}
>(path: string | undefined, data: GenericData[]) {
  let breadcrumb = <Breadcrumb[]>{};

  if (!path || !data) {
    return undefined;
  }

  const paths = toPathObject(path.split('/'));
  breadcrumb = paths.map((pathObject) => {
    const found = data.find((c) => c.path === pathObject.path);
    return {
      path: found?.path || pathObject.path,
      name: found?.name || pathObject.slug,
      isActive: found?.path === path
    };
  });

  return breadcrumb;
}
