import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { FeedComponent } from '../shared/modules/feed/components/feed/feed.component';

const routes: Routes = [
  { path: '', component: GlobalFeedComponent }
]

@NgModule({
  declarations: [GlobalFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule
  ]
})
export class GlobalFeedModule { }
