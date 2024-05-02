import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Motif } from "../models/motif.model";
import { Observable } from "rxjs";




@Injectable({
    providedIn: 'root'
  })

  export class MotifService {
    constructor(private http : HttpClient) { }
    httpOptions =
        {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/JSON',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            })
        };

        public getAllMotif() : Observable<Motif[]> {
            return this.http.get<Motif[]>(environment.apiUrl+'/motif/allmotif', this.httpOptions);
        }

  }