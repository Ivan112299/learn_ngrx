import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { topBarComponent } from './components/topbar.components';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [topBarComponent],
  imports: [
    CommonModule,
    RouterModule 
  ],
  providers:[],
  exports: [topBarComponent]
})
export class TopBarModule { }
