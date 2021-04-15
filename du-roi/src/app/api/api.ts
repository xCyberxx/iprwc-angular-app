import axios, {AxiosInstance} from 'axios';
import {Cookie} from 'ng2-cookies/ng2-cookies';

export class Api {
  private static apiServerUrl = 'http://localhost:3000/'; //'http://83.84.223.101:3000/';//'http://localhost:3000/';

  static getApi(): AxiosInstance {
    return axios.create({
      baseURL: this.apiServerUrl,
      headers: {
        Authorization: 'Bearer ' + Cookie.get('user_token'),
      }
    });
  }
}
