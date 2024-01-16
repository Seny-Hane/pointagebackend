import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    // private host : string = "http://localhost:8080";

  constructor(public http : HttpClient) { }

    getUserByUsername(email): Observable<any> {
        return this.http.get(environment.apiUrl +'/user/email/'+email)
    }

    getUserById(id:number):Observable<any> {
        return this.http.get(environment.apiUrl+'/user/user/'+id);
    }
}
