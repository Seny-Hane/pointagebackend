import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, Subject, tap} from "rxjs";
import {Agent} from "../models/agent.model";
import {environment} from "../../environments/environment";
import {Absence} from "../models/Absence";
import {Motif} from "../models/motif.model";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

    private _absenceSubject = new Subject<void>();

    get caisseSubject()
    {
        return this._absenceSubject;
    }

  constructor(private http : HttpClient) { }

    getAllMotif(){
        return this.http.get<Motif[]>(environment.apiUrl+'/motif/allmotif/');

    }
    getAllAbs(){
        return this.http.get<Absence[]>(environment.apiUrl+'/absence/listAgentAbs/');

    }

    getAllAbsByMat(matricule: string){
        return this.http.get<Absence[]>(environment.apiUrl+'/absence/listAgentAbsByMatricule/'+matricule);

    }

    public getAbsencesPeriodiqueParAgent(date1: string, date2: string, matricule: any) : Observable<Absence[]> {
        //debugger
        return this.http.get<Absence[]>(environment.apiUrl+'/absence/listAbsentsPerriodiqByAgent/'+date1+'/'+date2+'/'+matricule);
    }
    public getAbsencesPeriodiqueParInterDate(date1: string, date2: string, codeservice: any) : Observable<Absence[]> {
        return this.http.get<Absence[]>(environment.apiUrl+'/absence/listAbsentsPerriodiqByInterDate/'+date1+'/'+date2+'/'+codeservice);
    }

    putAbs(id:number,a:Absence)
    {
        return this.http.put(environment.apiUrl+'/absence/editabsence/'+id, a);


    }



}
