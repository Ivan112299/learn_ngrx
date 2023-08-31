import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthService } from './auth/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { topBarModule } from './shared/modules/topBar/topbar.module';
import { AuthInterceptor } from './shared/services/authInterceptor.service';
import { PersistantService } from './shared/services/persistant.servise';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // кол-во экшенов в дев тулз
      logOnly: !isDevMode(),
      autoPause: true, 
      trace: false, 
      traceLimit: 75, 
    }),
    EffectsModule.forRoot([]),
    topBarModule
  ],
  providers: [
    PersistantService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
