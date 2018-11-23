import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { switchMap, tap } from 'rxjs/operators';

import { PhotoService } from "../../photo/photo.service";
import { PhotoComment } from "../../photo/photo-comment";
import { AlertService } from "../../../shared/components/alert/alert.service";
import { ActivatedRoute, Router } from "@angular/router";



@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit { 

    @Input() photoId: number;
    commentForm: FormGroup;
    
    comments$: Observable<PhotoComment[]>;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });
    }

    save() {
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
            .addComment(this.photoId, comment)
            .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
            .pipe(tap(() => {
                this.commentForm.reset();
            }));
    }

    pay(){

        this.alertService.info("Você será redirecionado para o pagamento em instantes", true);
        this.router.navigate(['p/pay']);
        
    }
}