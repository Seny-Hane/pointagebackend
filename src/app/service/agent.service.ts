import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Agent} from "../models/agent.model";
import {Pointage} from "../models/pointage.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AgentService {

    constructor(private http : HttpClient) { }
    httpOptions =
        {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/JSON',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            })
        };
    // private _agentSubject = new Subject<void>();
    //
    // get _agentSubject()
    // {
    //     return this._agentSubject;
    // }


    public getAllAgent() : Observable<Agent[]> {
        return this.http.get<Agent[]>(environment.apiUrl+'/agent/allagent', this.httpOptions);
    }

    public getAgentByMatricule(matricule : string) : Observable<Agent> {
        return this.http.get<Agent>(environment.apiUrl+'/agent/matricule/'+matricule);
    }

    public getListAgentByService(codeService : number) : Observable<any[]> {
        return this.http.get<any[]>(environment.apiUrl+'/agent/listttAgent/'+codeService);
    }


    // public getEmployeeById(id : number) : Observable<Agent> {
    //     return this.http.get<Agent>(`${this.host}/agent/${id}`);
    // }

    public addAgent(agent : Agent) : Observable<Agent> {
        return this.http.post<Agent>(environment.apiUrl+'/agent/saveagent', agent);
    }

    public deleteAgent(idagent : number) : Observable<void> {
        return this.http.delete<void>(environment.apiUrl+'/agent/deleteagent/'+idagent);
    }

    public updateAgent(agent : Agent, idagent : number) : Observable<Agent> {
        return this.http.put<Agent>(environment.apiUrl+'/agent/editagent/'+idagent, agent);
    }

    public addPointageEntree( matricule:string, codeService:number):Observable<Pointage> {
        return this.http.post<Pointage>(environment.apiUrl+'/agent/matin/'+matricule+'/'+codeService,matricule);
    }

    public addPointageSortie( matricule : string) : Observable<Pointage> {
        return this.http.put<Pointage>(environment.apiUrl+'/agent/soir/'+matricule, matricule);
    }
    //public saveAgents(agent : Agent) : Observable<Agent> {
     //   return this.http.post<Agent>(environment.apiUrl+'/agent/savelistagents', agent);
   // }

    public getListAgentAbsenceByService(codeService : number) : Observable<any[]> {
        return this.http.get<any[]>(environment.apiUrl+'/agent/agentAbsent/'+codeService,this.httpOptions);
    }
}