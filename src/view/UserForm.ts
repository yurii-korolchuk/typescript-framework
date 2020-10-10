import {View} from './abstract/View';
import {User, UserProps} from '../models/User';

export class UserForm extends View<User, UserProps>{
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.button-random-age': this.setRandomAgeHandler,
      'click:.button-name': this.setNameHandler,
      'click:.button-save': this.saveUser
    };
  }

  setRandomAgeHandler = (): void => {
    this.model.setRandomAge()
  }

  saveUser = (): void => {
    this.model.save();
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
        <input type="text" class="name-input" placeholder="${this.model.get('name')}">
        <button class="button-name">Change name</button>
        <button class="button-random-age">Set Random User Age</button>
        <button class="button-save">Save User</button>
      </div>
    `;
  }
}