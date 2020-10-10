import {Model} from '../../models/abstract/Model';

  /*
  * T - type of Model we pass in View when extending some class,
  * K - interface of properties that T has
  */
export abstract class View<T extends Model<K>, K> {
  constructor(protected parent: Element, protected model: T ) {
    this.bindModel();
  };

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  };

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    Object.keys(eventsMap).forEach(key => {
      const [eventName, selector] = key.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[key]);
      })
    });
  }

  render(): void {
    this.parent.innerHTML = '';
    const template = document.createElement('template');
    template.innerHTML = this.template();
    this.bindEvents(template.content);
    this.parent.append(template.content);
  };
}