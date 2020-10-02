import {Eventing} from './user-composition/Eventing';

export class Collection<T> {
  private readonly collection: T[] = [];
  private readonly events: Eventing = new Eventing();

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }
}
