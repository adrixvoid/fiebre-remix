import {useLoaderData, useLocation} from '@remix-run/react';
import {Breadcrumb} from '~/types/breadcrumb';

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
  const docReferrer =
    typeof document !== 'undefined' && document.referrer
      ? document.referrer
      : '';

  return (
    referrerFromParams ||
    (location?.state?.referrer as string) ||
    encodeURIComponent(docReferrer)
  );
}

export default useReferrer;
