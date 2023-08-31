import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from 'src/app/auth/components/register/register.component';
import { reducers } from './store/reducer';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from './store/effect/registry.effect';
import { BackendErrorMessagesModule } from '../shared/modules/backenderrorMessages/backendErrorMessages.module';
import { PersistantService } from '../shared/services/persistant.servise';
import { LoginComponent } from './components/login/login.component';
import { LoginEffect } from './store/effect/login.effect';
import { GetCurrentUserEffect } from './store/effect/getCurrentUser.effect';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
]

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule, 
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect]),
    BackendErrorMessagesModule
  ],
  providers:[AuthService, PersistantService]
})
export class AuthModule { }
