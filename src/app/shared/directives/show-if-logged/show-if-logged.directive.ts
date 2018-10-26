import { Directive, Renderer, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { ElementRef } from "@angular/core";
import { UserService } from "../../../core/user/user.service";

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit { 
    
    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        !this.userService.isLogged() 
            && this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    }
}