import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

    public getAllPointage() : Observable<Pointage[]> {
        return this.http.get<Pointage[]>(environment.apiUrl+'/pointage/allpointage');
    }

    public getPointageByDate(date: string) : Observable<Pointage[]> {
        return this.http.get<Pointage[]>(environment.apiUrl+'/pointage/bydate/'+date);
    }

    public getRapport(date1: string, date2: string, service: any) : Observable<Pointage[]> {
        return this.http.get<Pointage[]>(environment.apiUrl+'/pointage/listeperriodique/'+date1+'/'+date2+'/service/'+service);
    }

    public controlePointage(matricule : string) : Observable<any> {
        return this.http.get<any>(environment.apiUrl+'/agent/controleexistance/'+matricule);
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
      //debugger
        return this.http.get<Agent[]>(environment.apiUrl+'/agent/AbsencePeriodiqService/'+codeservice+'/'+date1+'/'+date2);
    }



    public getAbsenceParDate(date1: string, service: any) : Observable<Agent[]> {
        return this.http.get<Agent[]>(environment.apiUrl+'/agent/listagentsAbsents/'+service+'/'+date1);
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
}
