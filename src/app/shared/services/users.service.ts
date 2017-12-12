import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {BaseApi} from '../core/base.api';


@Injectable()
export class UserService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }

  getUserByEmail (email: string): Observable<User> {
    return this.get(`users?email=${email}`)
      .map((user) => {
          return user[0] ? user[0] : undefined;
      });
  }

  createNewUser (user: User): Observable<User> {
    return this.post('users', user);
  }
}
