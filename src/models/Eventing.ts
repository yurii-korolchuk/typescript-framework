type Callback = () => void;

export class Eventing {
  private readonly events: {
    [key: string]: Callback[]
  };

  constructor() {
    this.events = {};
  }

  on = (eventName: string, callback: Callback): void => {
    if (this.events[eventName]) {
      this.events[eventName] = [...this.events[eventName], callback];
    } else {
      this.events[eventName] = [callback];
    }
  };

  trigger = (eventName: string): void => {
    if (this.events[eventName]) {
      this.events[eventName].forEach(event => {
        event();
      })
    } else {
      throw new Error(`No such event as ${eventName}`);
    }
  }
}