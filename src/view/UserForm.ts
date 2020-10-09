export class UserForm {
  constructor(private parent: Element) {};

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick
    };
  };

  onButtonClick(): void {
    console.log('Hello');
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <input type="text">
      </div>
    `;
  }

  render(): void {
    this.parent.innerHTML = this.template();
  }
}