import { Eventing } from './Eventing';
import { Sync } from './Sync';
import {Attributes} from './Attributes';
import {AxiosResponse} from 'axios';

type Gender = 'Male' | 'Female' | 'M' | 'F' | 'male' | 'female' | 'm' | 'f' | 'other';

interface UserProps{
  name?: string,
  age?: number,
  gender?: Gender,
  id?: number
}

export class User {
  static path = `http://localhost:3000/users`

  public attributes: Attributes<UserProps>;
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(User.path);

  constructor(attributes: UserProps) {
    this.attributes = new Attributes<UserProps>(attributes);
  }

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

  get fetch() {
    const id = this.attributes.get('id');
    if (id) {
      return this.sync.fetch(id).then((response: AxiosResponse): void => {
        this.set(response.data);
      });
    } else {
      throw new Error(`Cannot fetch ${this.attributes.get('name')}`);
    }
  }

  get save() {
    return this.sync.save;
  }


}