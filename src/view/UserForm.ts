import {View} from './abstract/View';
import {User, UserProps} from '../models/User';

export class UserForm extends View<User, UserProps>{
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.button-random-age': this.setRandomAgeHandler,
      'click:.button-name': this.setNameHandler
    };
  }

  setRandomAgeHandler = (): void => {
    this.model.setRandomAge()
  }

  setNameHandler = (): void => {
    const input = this.parent.querySelector('input').value;
    if (input) {
      this.model.set({ name: input })
    }
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input type="text" class="name-input">
        <button class="button-name">Change name</button>
        <button class="button-random-age">Set Random User Age</button>
      </div>
    `;
  }
}