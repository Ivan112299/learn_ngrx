import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { TopBarModule } from './shared/modules/topBar/topbar.module';
import { AuthInterceptor } from './shared/services/authInterceptor.service';
import { PersistantService } from './shared/services/persistant.servise';
import { GlobalFeedModule } from './global-feed/global-feed.module';
import { FeedModule } from './shared/modules/feed/feed.module';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({router: routerReducer}),   // routerReducer из отдельной бибдиотеки функционал отследивания изменений роута через redux
    StoreDevtoolsModule.instrument({
      maxAge: 25, // кол-во экшенов в дев тулз
      logOnly: !isDevMode(),
      autoPause: true, 
      trace: false, 
      traceLimit: 75, 
    }),
    EffectsModule.forRoot([]),
    TopBarModule,
    GlobalFeedModule,
    FeedModule,
    StoreRouterConnectingModule.forRoot()

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
