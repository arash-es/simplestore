export class PubSub extends EventTarget {
  publish(eventName: string, data: any) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }
  subscribe(eventName: string, cb: (data: any) => void) {
    const handler = (event: any) => cb(event.detail);
    this.addEventListener(eventName, handler);
    return () => {
      this.removeEventListener(eventName, handler);
    };
  }
}
