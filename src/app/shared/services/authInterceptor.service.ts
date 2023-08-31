import { PersistantService } from 'src/app/shared/services/persistant.servise';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private persistantService: PersistantService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.persistantService.get('accesstoken')
    request = request.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : ''
      }
    })
    return next.handle(request)
  }

}