import axios, {AxiosPromise} from 'axios';

interface hasId {
  id?: number;
}

export class Sync<T extends hasId> {
  constructor(public rootUrl: string) {}

  fetch = (id: number): AxiosPromise => {
    try {
      return axios.get(`${this.rootUrl}/:${id}`);
    } catch (e) {
      console.log(e.message);
    }
  }

  save = (data: T): void => {
    const { id } = data;

    if (id) {
      axios.put(`${this.rootUrl}:${id}`, data);
    } else {
      axios.post(`${this.rootUrl}`, data);
    }
  }
}