import { currentUserSelector } from './../../../../auth/store/selectors';
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { isAnonimusSelector, isloggedInSelector } from "src/app/auth/store/selectors";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

@Component({
  selector: 'mc-topBar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.scss']
})
export class topBarComponent implements OnInit{

  isloggedIn$!: Observable<boolean | null>
  isAnonimus$!: Observable<boolean>
  currentUser$!: Observable<CurrentUserInterface | null>

  constructor(
    private store: Store
  ){}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(){
    this.isloggedIn$ = this.store.pipe(select(isloggedInSelector))
    this.isAnonimus$ = this.store.pipe(select(isAnonimusSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }
}