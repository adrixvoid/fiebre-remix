import {useLocation} from '@remix-run/react';
import useWindow from './useWindow';

function useLocationState() {
  const location = useLocation();
  const window = useWindow();

  function mergeLocationState(propsState: Record<string, any>) {
    return {
      ...location.state,
      ...propsState
    };
  }

  function getLocationStateReferrer() {
    return {
      ...location.state,
      referrer: window?.location.href
    };
  }

  return {getLocationStateReferrer, mergeLocationState};
}

export default useLocationState;
