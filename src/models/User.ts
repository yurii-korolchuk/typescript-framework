import { Eventing } from './Eventing';
import { Sync } from './Sync';
import {Attributes} from './Attributes';

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


}