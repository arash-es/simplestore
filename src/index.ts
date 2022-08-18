import { Dispatch, SetStateAction } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

interface Notifier<T> {
  (): void;
  getState: (data: T) => unknown;
}

function createStore<T = any>(data: T) {
  const listeners = new Set<Notifier<T>>();

  const dispatch: Dispatch<SetStateAction<T>> = (setStateAction) => {
    const newData: T = typeof setStateAction === "function" ? (setStateAction as Function)(data) : setStateAction;
    const prevData = data;
    data = newData;

    listeners.forEach((notifier) => {
      if (notifier.getState(prevData) !== notifier.getState(newData)) {
        notifier();
      }
    });
  };

  const useStore = <G = T>(getState: (state: T) => G) => {
    const subscribe = (notify: () => void) => {
      const notifier: Notifier<T> = Object.assign(notify, { getState });
      listeners.add(notifier);
      return () => listeners.delete(notifier);
    };
    const getSnapShot = () => getState(data);

    return useSyncExternalStore(subscribe, getSnapShot);
  };

  return { dispatch, useStore };
}

export { createStore };
