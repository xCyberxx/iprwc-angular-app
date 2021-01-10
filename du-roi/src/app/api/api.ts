import axios, {AxiosInstance} from 'axios';
import {Cookie} from 'ng2-cookies/ng2-cookies';

export class Api {
  private static apiServerUrl = 'http://localhost:3000/';

  // private static apiServerUrl = 'https://ipsen3api.nielsprins.com/';

  static getApi(): AxiosInstance {
    return axios.create({
      baseURL: this.apiServerUrl,
      headers: {
        Authorization: 'Bearer ' + Cookie.get('user_token'),
      }
    });
  }
}
