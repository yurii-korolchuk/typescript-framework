type Callback = () => {};

export class Eventing {
  private events: {
    [key: string]: Callback[]
  };

  on(eventName: string, callback: Callback): void {
    if (this.events[eventName]) {
      this.events[eventName] = [...this.events[eventName], callback];
    } else {
      this.events[eventName] = [callback];
    }
  };

  trigger(eventName: string): void {
    if (this.events[eventName]) {
      this.events[eventName].forEach(event => {
        event();
      })
    } else {
      //throw new Error(`No such event as ${eventName} in ${this.data.name} User`)
    }
  }
}