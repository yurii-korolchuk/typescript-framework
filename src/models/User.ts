type Gender = 'Male' | 'Female' | 'M' | 'F' | 'male' | 'female' | 'm' | 'f' | 'other';

interface UserProps {
  name: string,
  age: number,
  gender: Gender
}

interface UserPropsOptional {
  name?: string,
  age?: number,
  gender?: Gender
}

export class User {
  private data: UserProps

  constructor(userProps: UserProps) {
    this.data = userProps;
  }

  get(propName: string): string | number {
    if (this.data[propName]) {
      return this.data[propName];
    } else {
      throw new Error(`No such field ${propName} in ${this.data.name} User`);
    }
  }

  set(update: UserPropsOptional): void {
    this.data = { ...this.data, ...update };
  }
}