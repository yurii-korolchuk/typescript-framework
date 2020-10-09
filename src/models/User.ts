import { Eventing } from './user-composition/Eventing';
import { Sync } from './user-composition/Sync';
import {Attributes} from './user-composition/Attributes';
import {Model} from './abstract/Model';

type Gender = 'Male' | 'Female' | 'M' | 'F' | 'male' | 'female' | 'm' | 'f' | 'other';

interface UserProps{
  name?: string,
  age?: number,
  gender?: Gender,
  id?: number
}

export class User extends Model<UserProps> {
  static path = `http://localhost:3000/users`;

  static buildUser = (attributes: UserProps): User => {
    return new User(
      new Attributes(attributes),
      new Sync(User.path),
      new Eventing()
    )
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}