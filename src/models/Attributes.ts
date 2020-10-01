export class Attributes<T> {
  private data: T;

  constructor(props: T) {
    this.data = props;
  };

  get = <K extends keyof T>(key: K): T[K] => {
    if (this.data[key]) {
      return this.data[key];
    }
  };

  set = (update: T): void => {
    this.data = { ...this.data, ...update };
  };
}
