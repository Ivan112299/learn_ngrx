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


const routes: Routes = [
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule, 
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect]),
    BackendErrorMessagesModule
  ],
  providers:[AuthService]
})
export class AuthModule { }
