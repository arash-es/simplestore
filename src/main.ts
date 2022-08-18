import { PubSub } from "./utils";
import { useEffect, useState } from "react";

export function createStore<T = any>(data: T) {
  const channel = new PubSub();
  const updateData = (newData: T) => {
    data = newData;
    channel.publish(newData);
  };
  return () => {
    const [state, setState] = useState<T>(data);
    useEffect(() => channel.subscribe(setState), []);
    return [state, updateData] as const;
  };
}
