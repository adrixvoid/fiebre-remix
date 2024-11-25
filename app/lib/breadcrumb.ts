import {Breadcrumb} from '~/types/breadcrumb';

export function toPathObject(slugs: string[]) {
  const temp = [...slugs];
  const response = slugs.reverse().map((slug) => {
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
  GenericData extends {path: string | null; slug: string; name: string}
>(path: string = '', data: GenericData[]) {
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
