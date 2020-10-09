import {User} from '../models/User';

export class UserForm {
  constructor(private parent: Element, private model: User) {};

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick
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

  onButtonClick(): void {
    console.log('Hello');
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input type="text">
        <button>Click me!</button>
      </div>
    `;
  }

  render(): void {
    const template = document.createElement('template');
    template.innerHTML = this.template();
    this.bindEvents(template.content);
    this.parent.append(template.content);
  }
}