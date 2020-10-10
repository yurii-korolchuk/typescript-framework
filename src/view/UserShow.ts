import {View} from './abstract/View';
import {User, UserProps} from '../models/User';

export class UserShow extends View<User, UserProps> {
  eventsMap(): { [p: string]: () => void } {
    return {}
  };

  template(): string {
    return `
      <div>
        <h1>User Info</h1>
        <div>User Name: ${this.model.get('name')}</div>
        <div>User Age: ${this.model.get('age')}</div>
      </div>
    `
  };
}