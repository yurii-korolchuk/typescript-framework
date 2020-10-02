import {AxiosPromise, AxiosResponse} from 'axios';
import {Callback} from '../user-composition/Eventing';
import {HasIdAndName} from '../user-composition/Sync';

export interface AttributesModel<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

export interface SyncModel<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface EventingModel {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export abstract class Model<T extends HasIdAndName> {
  protected constructor(
    private attributes: AttributesModel<T>,
    private sync: SyncModel<T>,
    private events: EventingModel
  ) {}

  get get() {
    return this.attributes.get;
  }

  get set() {
    this.events.trigger('change');
    return this.attributes.set;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    const id = this.get('id');
    if (id) {
      this.sync.fetch(id).then((response: AxiosResponse): void => {
        this.set(response.data);
      });
    } else {
      throw new Error(`Cannot fetch ${this.attributes.get('name')}`);
    }
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        //this.trigger('save');
      })
      .catch(error => {
        //this.trigger('error');
      })
  }
}