import { isFunction, PubSub } from "./utils";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

function createStore<T = any>(data: T) {
  const channel = new PubSub<T>();
  const dispatch: Dispatch<SetStateAction<T>> = (setStateAction) => {
    const newData: T = isFunction(setStateAction) ? setStateAction(data) : setStateAction;
    data = newData;
    channel.publish(newData);
  };

  const useStore = <G = T>(getState: (state: T) => G) => {
    const [state, setState] = useState(() => getState(data));
    const stateRef = useRef(state);

    const updateData = (newState: ReturnType<typeof getState>) => {
      stateRef.current = newState;
      setState(newState);
    };

    const onStoreUpdate = (storeNewState: T) => {
      const newState = getState(storeNewState);
      if (newState !== stateRef.current) {
        updateData(newState);
      }
    };

    useEffect(() => channel.subscribe(onStoreUpdate), []);
    return state;
  };
  return { dispatch, useStore };
}

export { createStore };
