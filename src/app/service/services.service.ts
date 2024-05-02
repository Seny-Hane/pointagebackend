import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { Drp } from '../models/drp';
import { TypeService } from '../models/typeService.model';
import {StatutAgent} from "../models/statutAgent";
import {Service} from "../models/service";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http : HttpClient) { }


    public getAllService() : Observable<Service[]> {
        return this.http.get<Service[]>(environment.apiUrl+'/service/allservice');
    }

    public getAllStatut() : Observable<StatutAgent[]> {
        return this.http.get<StatutAgent[]>(environment.apiUrl+'/statut/allstatut');
    }

    public getServiceByCodeService(codeservice : number) : Observable<Service> {
        return this.http.get<Service>(environment.apiUrl+'/service/'+codeservice);
    }

    public postService(service:Service){
      //debugger
      return this.http.post(environment.apiUrl+'/service/saveservices',service)

     }

    public updateService(service : Service, codeservice : number) : Observable<Service> {
        return this.http.put<Service>(environment.apiUrl+'/service/editservice/'+codeservice, service);
    }
    deleteService(codeservice: number) {
        return this.http.delete(environment.apiUrl+'/service/deleteservice/'+codeservice)
    }

    public getAllDrp() : Observable<Drp[]> {
      return this.http.get<Drp[]>(environment.apiUrl+'/drp/alldrp');
      }
  public getAllTypeService() : Observable<TypeService[]> {
    return this.http.get<TypeService[]>(environment.apiUrl+'/typeservice/alltype');
}
}
