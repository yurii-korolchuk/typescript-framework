type Gender = 'Male' | 'Female' | 'M' | 'F' | 'male' | 'female' | 'm' | 'f' | 'other';
type Callback = () => {};

interface UserProps {
  name: string,
  age: number,
  gender: Gender
}

interface UserPropsOptional {
  name?: string,
  age?: number,
  gender?: Gender
}

export class User {
  private data: UserProps;
  private events: {
    [key: string]: Callback[]
  };

  constructor(userProps: UserProps) {
    this.data = userProps;
  };

  get(propName: string): string | number {
    if (this.data[propName]) {
      return this.data[propName];
    } else {
      throw new Error(`No such as field ${propName} in ${this.data.name} User`);
    }
  };

  set(update: UserPropsOptional): void {
    this.data = { ...this.data, ...update };
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
      throw new Error(`No such event as ${eventName} in ${this.data.name} User`)
    }
  }
}