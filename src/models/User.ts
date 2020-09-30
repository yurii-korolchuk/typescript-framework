import axios from 'axios';
import { AxiosResponse } from 'axios';

type Gender = 'Male' | 'Female' | 'M' | 'F' | 'male' | 'female' | 'm' | 'f' | 'other';

interface UserProps {
  name: string,
  age: number,
  gender: Gender,
  id?: number
}

interface UserPropsOptional {
  name?: string,
  age?: number,
  gender?: Gender
}

export class User {
  static path = `http://localhost:3000/users`

  private data: UserProps;


  constructor(userProps: UserProps) {
    this.data = userProps;
  };

  get(propName: string): string | number {
    if (this.data[propName]) {
      return this.data[propName];
    }
  };

  set(update: UserPropsOptional): void {
    this.data = { ...this.data, ...update };
  };

  fetch(): void {
    try {
      axios.get(`${User.path}/:${this.get('id')}`)
        .then((response: AxiosResponse): void => {
          this.set(response.data)
        });
    } catch (e) {
      console.log(e.message);
    }
  }

  save(): void {
    const id = this.get('id');

    if (id) {
      axios.put(`${User.path}:${id}`, this.data)
    } else {
      axios.post(`${User.path}`, this.data)
    }
  }
}