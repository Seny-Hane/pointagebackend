import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pointage} from "../models/pointage.model";
import {Agent} from "../models/agent.model";
import {environment} from "../../environments/environment";
//import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PointageService {

  constructor(public http : HttpClient) { }
    httpOptions =
        {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/JSON',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            })
        };

    public getAllPointage() : Observable<Pointage[]>{
        return this.http.get<Pointage[]>(environment.apiUrl+'/pointage/allpointage');
    }

    public findByPresenceDatepointage(datepointage:string,codeservice:any) : Observable<Pointage[]>{
        return this.http.get<Pointage[]>(environment.apiUrl+'/pointage/listepresence/'+datepointage+'/service/'+codeservice);
    }

    public getPointageByDate() : Observable<Pointage[]> {
        return this.http.get<Pointage[]>(environment.apiUrl+'/pointage/bydate');
    }
    public getPointageByDateChoi( date1: string) : Observable<Pointage[]> {
        return this.http.get<Pointage[]>(environment.apiUrl+'/pointage/bydate/'+date1);
    }

    public getRapport(date1: string, date2: string, service: any) : Observable<Pointage[]> {
        return this.http.get<Pointage[]>(environment.apiUrl+'/pointage/listeperriodique/'+date1+'/'+date2+'/'+service);
    }

    public controlePointage(matricule : string) : Observable<any> {
        return this.http.get<any>(environment.apiUrl+'/agent/controleexistance/'+matricule);
    }

    public checkPointage(matricule : string,datepointage:string) : Observable<any> {
        return this.http.get<any>(environment.apiUrl+'/agent/controleexistanceByDate/'+matricule+'/'+datepointage);
    }

    public controlePointageSoir(matricule : string) : Observable<any> {
        return this.http.get<any>(environment.apiUrl+'/agent/controleupdate/'+matricule);
    }

    public getAbsencePeriodique(date1: string, date2: string, service: any) : Observable<Agent[]> {
        return this.http.get<Agent[]>(environment.apiUrl+'/agent/listAbsentsPerriodique/'+service+'/'+date1+'/'+date2);
    }

    public getAbsencesPeriodiqueParMatricule(date1: string, date2: string, matricule: any) : Observable<Agent[]> {
        return this.http.get<Agent[]>(environment.apiUrl+'/agent/listAbsentsPerriodiq/'+matricule+'/'+date1+'/'+date2);
    }

    public getAbsencesPeriodiqueParService(date1: string, date2: string, codeservice: any) : Observable<Agent[]> {
        return this.http.get<Agent[]>(environment.apiUrl+'/agent/listAbsentsPerriodique/'+date1+'/'+date2+'/'+codeservice);
    }



    public getAbsenceParDate(service: any,date1: string) : Observable<Agent[]> {
        return this.http.get<Agent[]>(environment.apiUrl+'/agent/listagentsAbsentsParJour/'+service+'/'+date1);
    }
    public getAbsenceParJour(service: any) : Observable<Agent[]> {
        return this.http.get<Agent[]>(environment.apiUrl+'/agent/listagentsAbsentsParJour/'+service);
    }

    public getPointageGlobale(date1: string, date2: string) : Observable<Pointage[]> {
        return this.http.get<Pointage[]>(environment.apiUrl+'/pointage/listeglobale/'+date1+'/'+date2);
    }

    public getHeureServeur() : Observable<any> {
        return this.http.get<any>(environment.apiUrl+'/pointage/heureserveur')
    }

    public getListPointageByService(date1: string, date2: string, codeservice: number) : Observable<Agent[]> {
        return this.http.get<Agent[]>(environment.apiUrl+'/pointage/listPointageDateInvterByService/'+date1+'/'+date2+'/'+codeservice);
    }

    public addPointage(matricule: string, codeservice: number, pointage:Pointage): Observable<Pointage> {
        return this.http.post<Pointage>(environment.apiUrl + '/pointage/' + matricule + '/' + codeservice, pointage);
    }

    // public addPointage(pointage: Pointage): Observable<Pointage>{
    //     return this.http.post<Pointage>(environment.apiUrl + '/pointage/savepointage',pointage)
    // }

    public addPointageSortie( idpointage : number, pointage:Pointage) : Observable<Pointage> {
        return this.http.put<Pointage>(environment.apiUrl+'/pointage/soir/'+idpointage, pointage);
    }
}
