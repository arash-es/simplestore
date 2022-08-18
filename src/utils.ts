class PubSub<T = any> extends EventTarget {
  private static lastChannelId: number = 0;
  private channelId: string;
  constructor() {
    super();
    this.channelId = `${PubSub.lastChannelId++}`;
  }
  publish(data: T) {
    this.dispatchEvent(new CustomEvent(this.channelId, { detail: data }));
  }
  subscribe(cb: (data: T) => void) {
    const handler = ((event: CustomEvent) => cb(event.detail)) as EventListener;
    this.addEventListener(this.channelId, handler);
    return () => this.removeEventListener(this.channelId, handler);
  }
}

const isFunction = (inp: unknown): inp is Function => typeof inp === "function";

export { PubSub, isFunction };
