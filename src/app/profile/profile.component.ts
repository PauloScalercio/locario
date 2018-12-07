import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user/user.service';

@Component({
    selector: 'ap-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit { 

    private _user;
    
    
    constructor(
        private userService: UserService
    ) {
        
        
    }

    ngOnInit(): void {
        this.userService
            .getUser()
            .subscribe(
                user => {
                    console.log(user);
                    this._user = user;
                }
            );
    }

    get user() {
        return this._user;
    }

}