import { Cookie } from "ng2-cookies/ng2-cookies";
import { Api } from "./api/api";
import { Token } from "./token";
import jwt_decode from 'jwt-decode';

export class User {

    private _id : string;
    private _email : string;
    private _firstname : string;
    private _lastname : string;
    private _usergroup : string;

    constructor(id : string, email : string, firstname : string, lastname : string, userGroup : string)
    {
        this._id = id;
        this._email = email;
        this._firstname = firstname; 
        this._lastname = lastname;
        this._usergroup = userGroup;

    }


    get id(): string {
      return this._id;
    }
  
    get email(): string {
      return this._email;
    }
  
    get userGroup(): string {
      return this._usergroup;
    }
  
    get firstName(): string {
      return this._firstname;
    }

    set firstName(nfirstName : string) {
      this._firstname = nfirstName;
    }
  
    get lastName(): string {
      return this._lastname;
    }

    set lastName(nlastName : string) {
      this._lastname = nlastName;
    }

    static async createUser(nEmail : string, nFirstname : string, nLastname : string, nPassword : string) : Promise<number>
    {
        const api = Api.getApi();
        const postData = {email: nEmail, firstname: nFirstname, lastname: nLastname, password: nPassword};
        console.log(postData);
        await api.post('/user/create', postData).then((response) => {
            console.log("Created user");
        });
        return 1
    }

    static async updateUser(nId: string, nEmail : string, nFirstname : string, nLastname : string, nPassword : string) : Promise<number>
    {
        const api = Api.getApi();
        const postData = {id: nId, email: nEmail, firstname: nFirstname, lastname: nLastname, password: nPassword};
        console.log("updating user.");
        console.log(postData);
        await api.post('/user/update', postData).then((response) => {
            console.log("updated user");
        });
        return 1
    }

    static async Login(nEmail : string, nPassword : string) : Promise<number>
    {
        const api = Api.getApi();
        const postData = {email: nEmail, password: nPassword};
        console.log(postData);
        let result = await api.post('/user/checkUserCredentials', postData).then((response) => {
          if (response.data.login !== 'success') {
            // this.success = false;
            console.log("Login failed..");
            return 0;
          } else {
            console.log(response.data.token);
            Cookie.set('user_token', response.data.token, 7, '/');
            //this.router.navigate([this.router.url + '/dashboard']);
            return 1;
          }
        });
        return result;
    }

    static getLoggedInUser(redirectToLogin = true): User {
      const token = Cookie.get('user_token');
  
      if (token !== null) {
        try {
          const userData: Token = jwt_decode(token);
          return new User(userData.id, userData.email, userData.firstname, userData.lastname, userData.user_group);
        } catch (error) {
          Cookie.delete('user_token', '/');
        }
      }
  
      // if (redirectToLogin) {
      //   window.location.replace('/admin');
      // }
    }

    static Logout()
    {
      Cookie.delete('user_token', '/');
    }

}
