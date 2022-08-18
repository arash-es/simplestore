import { PubSub } from "./utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const isFunction = (inp: unknown): inp is Function => typeof inp === "function";

export function createStore<T = any>(data: T) {
  const channel = new PubSub();
  const updateData: Dispatch<SetStateAction<T>> = (setStateAction) => {
    const newData: T = isFunction(setStateAction) ? setStateAction(data) : setStateAction;
    data = newData;
    channel.publish(newData);
  };
  return () => {
    const [state, setState] = useState<T>(data);
    useEffect(() => channel.subscribe(setState), []);
    return [state, updateData] as const;
  };
}
