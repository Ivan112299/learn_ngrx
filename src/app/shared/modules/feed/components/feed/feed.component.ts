import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getFeedAction } from '../../store/actions/getFeed.action';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';
import { dataSelector, errorSelector, feedFeatureSelector, isLoadingSelector } from '../../store/selectors';
import { environment } from 'src/assets/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { parseUrl } from 'query-string/base';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @Input('apiUrl')
  apiUrlProps!: string

  isLoading$!: Observable<boolean>
  error$!: Observable<string | null>
  feed$!: Observable<GetFeedResponseInterface | null>
  limit = environment.limit
  baseUrl!: string
  currentPage!: number
  

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    
    this.itittializeValues()
    this.initializeListeners()
  }

  itittializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(dataSelector))
    this.baseUrl = this.router.url.split('?')[0]         // на случай если в строке есть параметры мы сплитим по знаку ? и берем первый элеимент
  }

  fetchData(): void {
    const offset = this.currentPage * this.limit - this.limit

    // разобраться с ошибкой импорта потом
    // let parsedUrl = parseUrl(this.apiUrlProps)
    const targetUrl = `${this.apiUrlProps}?limit=${this.limit}&offset=${offset}`
    this.store.dispatch(getFeedAction({url: targetUrl}))
  }

  initializeListeners(): void{
    this.route.queryParams.subscribe((params: Params) => {     // тут отписака не нужна т.к. это ActivatedRoute
      if(!params['page']) {
        this.currentPage = 1
      } else {
        this.currentPage = Number(params['page'])
      }
      this.fetchData()
    })
  }

}
