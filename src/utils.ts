export class PubSub extends EventTarget {
  private static lastChannelId: number = 0;
  private channelId: string;
  constructor() {
    super();
    this.channelId = `${PubSub.lastChannelId++}`;
  }
  publish(data: any) {
    this.dispatchEvent(new CustomEvent(this.channelId, { detail: data }));
  }
  subscribe(cb: (data: any) => void) {
    const handler = ((event: CustomEvent) => cb(event.detail)) as EventListener;
    this.addEventListener(this.channelId, handler);
    return () => this.removeEventListener(this.channelId, handler);
  }
}
