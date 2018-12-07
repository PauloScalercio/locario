import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent { 

    user$: Observable<User>;

    constructor(
        private userService: UserService, 
        private router:Router,
        private alertService: AlertService,
    ) {

        this.user$ = userService.getUser();
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['']);
    }

    deactive(userName){
        console.log(userName);
        this.userService
            .deactive(userName)
            .subscribe(()=> {
                this.logout();
            this.alertService.info("Você desativou sua conta :(", true);
                
            });
        
    }

    profile(userName){
        console.log(userName)
        this.router.navigate([`user/${userName}/profile`]);
    }
}