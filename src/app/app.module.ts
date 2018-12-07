import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { PhotosModule } from './photos/photos.module';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';
import { CoreModule } from './core/core.module';
import { PaymentModule } from './payment/payment.module';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("CLIENT-ID")
        }
         
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PhotosModule,
    ErrorsModule,
    PaymentModule,
    CoreModule,
    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
