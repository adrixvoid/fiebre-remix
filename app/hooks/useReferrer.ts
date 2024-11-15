import {useLoaderData, useLocation} from '@remix-run/react';
import {Breadcrumb} from '~/types/breadcrumb';
import useDocument from './useDocument';

type LocationState = {
  breadcrumb?: Breadcrumb[] | [];
  referrer?: string;
  [key: string]: any;
};

interface HookReferrerProps {
  defaultReferrer?: string;
}

// export const useToggle = (defaultVisibility = false): [Boolean, () => void] => {
function useReferrer(props?: HookReferrerProps) {
  const document = useDocument();
  const {referrer: referrerFromParams} = useLoaderData<{
    referrer: string;
  }>() as {referrer: string};
  const location = useLocation();
  const docReferrer =
    typeof document !== 'undefined' && document.referrer
      ? document.referrer
      : '';

  const finalReferrer =
    docReferrer !== document?.location.href
      ? docReferrer
      : props?.defaultReferrer;

  return (
    referrerFromParams ||
    (location?.state?.referrer as string) ||
    finalReferrer ||
    ''
  );
}

export default useReferrer;
