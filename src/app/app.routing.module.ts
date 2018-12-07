import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { PayComponent } from './payment/pay/pay.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { 
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    { 
        path: 'all', 
        pathMatch: 'full',
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },       
    { 
        path: 'user/:userName/profile', 
        pathMatch: 'full',
        component: ProfileComponent
    },       
    { 
        path: 'user/:userName', 
        pathMatch: 'full',
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'p/pay', 
        component : PayComponent
    }, 
    { 
        path: 'p/:photoId', 
        component: PhotoDetailsComponent,
    }, 
    { 
        path: 'not-found', 
        component: NotFoundComponent 
    },     
    { 
        path: '**', 
        redirectTo: 'not-found'
    },  
     
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes, { useHash: true } ) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

