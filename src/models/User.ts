import { Eventing } from './Eventing';
import { Sync } from './Sync';
import {Attributes} from './Attributes';
import {Model} from './Model';

type Gender = 'Male' | 'Female' | 'M' | 'F' | 'male' | 'female' | 'm' | 'f' | 'other';

interface UserProps{
  name?: string,
  age?: number,
  gender?: Gender,
  id?: number
}

export class User extends Model<UserProps>{
  static path = `http://localhost:3000/users`;

  static buildUser = (attributes: UserProps): User => {
    return new User(
      new Attributes(attributes),
      new Sync(User.path),
      new Eventing()
    )
  }
}