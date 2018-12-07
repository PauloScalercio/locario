import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';
import { provideForRootGuard } from '@angular/router/src/router_module';

import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { UserService } from '../../core/user/user.service';

const API = environment.ApiUrl;

@Injectable()
export class SignUpService {

    constructor(private http: HttpClient,
        private userService: UserService) {}
    
    checkUserNameTaken(userName: string) {
        
        return this.http.get(API + '/user/exists/' + userName);
    }
    
    signup(newUser: NewUser) {
        return this.http.post(API + '/user/signup', newUser);
    }

    signinWithGmail(newUser: NewUser) {
       return this.http
                    .post(API + '/user/loginWithGmail', newUser, { observe: 'response'})
                    .pipe(tap(res => {
                        const authToken = res.headers.get('x-access-token');
                        this.userService.setToken(authToken);
                        console.log(`User ${newUser.userName} authenticated with token ${authToken}`);
                    }));
    }
}