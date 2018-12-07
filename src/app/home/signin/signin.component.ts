import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceApp } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

import {
    AuthService,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { SignUpService } from '../singup/signup.service';
import { NewUser } from '../singup/new-user';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthServiceApp,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private socialAuthService: AuthService,
        private signUpService: SignUpService) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.platformDetectorService.isPlatformBrowser() && 
        this.userNameInput.nativeElement.focus();        
    } 

    public socialSignIn(socialPlatform : string) {
        let socialPlatformProvider;
       if(socialPlatform == "google"){
          socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        
        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
            console.log(socialPlatform+" sign in data : " , userData);
           
            const newUser = {
                userName: userData.name.trim().replace(new RegExp(' ', 'g'), ""), 
                email: userData.email,
                fullName: userData.name,
                password: ""
            } as NewUser;
            this.signUpService
                .signinWithGmail(newUser)
                .subscribe(
                    () => this.router.navigate(['user', newUser.userName]),
                    err => console.log(err)
                );
          }
        );
      }


    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => this.router.navigate(['user', userName]),
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    this.platformDetectorService.isPlatformBrowser() && 
                        this.userNameInput.nativeElement.focus();
                    alert('Invalid user name or password');
                }
            );
    }
}