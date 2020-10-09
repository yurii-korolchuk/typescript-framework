import {User} from '../models/User';

export class UserForm {
  constructor(private parent: Element, private model: User ) {
    this.bindModel();
  };

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.button-random-age': this.setRandomAgeHandler,
      'click:.button-name': this.setNameHandler
    };
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    Object.keys(eventsMap).forEach(key => {
      const [eventName, selector] = key.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[key]);
      })
    });
  }

  setRandomAgeHandler = (): void => {
    this.model.setRandomAge()
  }

  setNameHandler = (): void => {
    const input = this.parent.querySelector('input');
    const name = input.value;
    this.model.set({name})
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

  render(): void {
    this.parent.innerHTML = '';
    const template = document.createElement('template');
    template.innerHTML = this.template();
    this.bindEvents(template.content);
    this.parent.append(template.content);
  }
}