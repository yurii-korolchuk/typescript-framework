import axios, { AxiosPromise } from 'axios';

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

  save = (data: T): AxiosPromise => {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}:${id}`, data);
    } else {
      return axios.post(`${this.rootUrl}`, data);
    }
  }
}