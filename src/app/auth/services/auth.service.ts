import { Observable, map } from 'rxjs';
import { Injectable } from "@angular/core";
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/assets/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient){}

    //TODO: исправить тип data, менялся API пока закостылил что бы не запутаться

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {           
        const url = `${environment.apiUrl}/users`
        
        return this.http.post<AuthResponseInterface>(url, data)
            .pipe(map((response) => response.user))
    }
}