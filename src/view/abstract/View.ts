import {Model} from '../../models/abstract/Model';

  /*
  * T - type of Model we pass in View when extending some class,
  * K - interface of properties that T has
  */
export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(protected parent: Element, protected model: T ) {
    this.bindModel();
  };


  abstract template(): string;

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  regionMap(): { [key: string]: string} {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  };

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionMap();

    Object.keys(regionsMap).forEach(key => {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    })
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

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';

    const template = document.createElement('template');
    template.innerHTML = this.template();

    this.bindEvents(template.content);
    this.mapRegions(template.content);

    this.onRender();
    this.parent.append(template.content);
  };
}