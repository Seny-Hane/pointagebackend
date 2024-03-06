import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Roles} from "../models/roles";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http : HttpClient) { }
    httpOptions =
        {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/JSON',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            })
        };


    getAllRoles(): Observable<Roles[]> {
        return this.http.get<Roles[]>(environment.apiUrl +'/api/user/getroles' ,this.httpOptions)
    }

    getAllRolees(): Observable<Roles[]> {
        return this.http.get<Roles[]>(environment.apiUrl +'/role')
    }

    getRole(): Observable<any> {
        return this.http.get(environment.apiUrl +'/role')
    }

    saveRole(role:Roles): Observable<any> {
        return this.http.post(environment.apiUrl +'/role',role)
    }

}
