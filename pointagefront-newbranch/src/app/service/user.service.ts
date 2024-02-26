import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Users} from "../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    // private host : string = "http://localhost:8080";

  constructor(public http : HttpClient) { }
    httpOptions =
        {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/JSON',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            })
        };

    getUserByUsername(email): Observable<any> {
        return this.http.get(environment.apiUrl +'/user/emails/'+email , this.httpOptions)
    }

    getAllUser(): Observable<any> {
        return this.http.get(environment.apiUrl +'/user/alluser', this.httpOptions)
    }

    saveUser(user:any): Observable<any> {
        return this.http.post<any>(environment.apiUrl +'/user/user1', this.httpOptions)
    }

    updateUser(userId: number,user:Users): Observable<any> {
        return this.http.post<any>(environment.apiUrl +'/user/user1/'+userId, user, this.httpOptions)
    }


    getUserById(id:number):Observable<any> {
        return this.http.get(environment.apiUrl+'/user/user/'+id);
    }

}
