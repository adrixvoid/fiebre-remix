import {useLoaderData, useLocation} from '@remix-run/react';
import {Breadcrumb} from '~/types/global.type';

type LocationState = {
  breadcrumb?: Breadcrumb[] | [];
  referrer?: string;
  [key: string]: any;
};

function useReferrer() {
  const {referrer: referrerFromParams} = useLoaderData<{
    referrer: string;
  }>() as {referrer: string};
  const location = useLocation();

  return (
    referrerFromParams ||
    (location?.state?.referrer as string) ||
    encodeURIComponent(document?.referrer) ||
    ''
  );
}

export default useReferrer;
