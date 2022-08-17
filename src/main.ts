import { PubSub } from "./utils";
import { useEffect, useState } from "react";

let lastId = 0;
export function createStore<T = any>(data: T) {
  const pubSub = new PubSub();
  const storeId = lastId++;
  const updateData = (newData: T) => {
    data = newData;
    pubSub.publish(`${storeId}`, newData);
  };

  return () => {
    const [state, setState] = useState<T>(data);
    useEffect(() => {
      return pubSub.subscribe(`${storeId}`, setState);
    }, []);

    return [state, updateData];
  };
}
