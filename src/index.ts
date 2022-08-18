import { Dispatch, SetStateAction } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";

type Notifier = () => void;

function createStore<T = any>(data: T) {
  const listeners = new Set<Notifier>();
  const dispatch: Dispatch<SetStateAction<T>> = (setStateAction) => {
    data = typeof setStateAction === "function" ? (setStateAction as Function)(data) : setStateAction;
    listeners.forEach((notifier) => notifier());
  };
  // @ts-ignore
  const useStore = <G = T>(getState: (state: T) => G = (d) => d) => {
    const subscribe = (notifier: Notifier) => {
      listeners.add(notifier);
      return () => listeners.delete(notifier);
    };
    const getSnapShot = () => data;
    return useSyncExternalStoreWithSelector(subscribe, getSnapShot, undefined, getState);
  };
  return { dispatch, useStore };
}

export { createStore };
