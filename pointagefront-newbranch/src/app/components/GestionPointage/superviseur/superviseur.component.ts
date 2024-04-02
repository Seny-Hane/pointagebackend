import { Component, OnInit } from '@angular/core';
import {Pointage} from "../../../models/pointage.model";
import {PointageService} from "../../../service/pointage.service";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {AgentService} from "../../../service/agent.service";
import {Agent} from "../../../models/agent.model";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-superviseur',
  templateUrl: './superviseur.component.html',
  styleUrls: ['./superviseur.component.scss']
})
export class SuperviseurComponent implements OnInit {
    selectedPointage: Pointage;
    selectedPointages: Pointage[];
    pointages: Pointage[];
    pointage : Pointage;
    pointageSubject = new Subject<void>()
    cols: any[];
    rowsPerPageOptions = [5, 10, 20];
    cu: any;
    rangeDates: Date[];
    minDate: Date;
    maxDate: Date;
    invalidDates: Array<Date>;
    date1: Date;
    triTime: boolean;
    currentTime = new Date();
    agent: Agent;
    tourner:boolean;
    erreur:boolean;
    today: string;
    todayWithPipe = null;
    pipe = new DatePipe('en-US');


    constructor(private pointageService : PointageService,
                private messageService: MessageService,
                private router : Router,
                private agentService : AgentService,
                private keycloak: KeycloakService) { }

    ngOnInit(): void {

        this.triTime = this.currentTime.getHours() > 5 && this.currentTime.getHours() < 13;

        this.getAllPointage();

        this.pointageSubject.subscribe(data => {
            this.getAllPointage()
        })
        //console.log(this.keycloak.getKeycloakInstance().profile.username)
        this.agentService.getAgentByMatricule(this.keycloak.getKeycloakInstance().profile.username).subscribe(
            (data)=>{
                this.agent=data;
                console.log(this.agent)
            }
        );

        this.today=this.todayWithPipe = this.pipe.transform(this.currentTime, 'dd-MM-yyyy');
        this.getList_PointageByDate();
    }

    getAllPointage() {
        this.tourner=true;
        this.pointageService.getAllPointage().subscribe(data => {
                this.pointages = data;
                this.tourner=false;
                this.erreur=false;
                this.pointages = this.pointages.filter(use => use.agent.service.codeservice === this.agent.service.codeservice);
                this.pointages.sort((a,b) => b.idpointage - a.idpointage);
                // this.pointageSubject.next()
                // this.pointages.forEach(element => {
                //
                //         const date1=element.heuredescente;
                //         const  date2=element.heurearrivee;
                //         const timeDiff =Math.abs(date1.getTime()-date2.getTime());
                //         this.cu=Math.floor(timeDiff/(1000*3600*24))
                //         console.log(this.cu);
                //
                // })
            },
            erreur => {
                console.log(erreur)
                this.tourner=false;
                this.erreur=true;
            })
    }

    getListPointageByDate(date1: Date) {
        this.tourner=true;
        let formatted_date = this.date1.getDate() + "-" + (this.date1.getMonth() + 1) + "-" + this.date1.getFullYear()
        this.pointageService.getPointageByDate(formatted_date).subscribe(data => {
            this.pointages = data;
            this.tourner=false;
            this.erreur=false;
            this.pointages = this.pointages.filter(use => use.agent.service.codeservice === this.agent.service.codeservice);
            this.pointages.sort((a,b) => b.idpointage - a.idpointage);
            if( data.length == 0) {
                this.messageService.add({severity: 'erreur', summary: 'Erreur', detail: "absence de données à la date choisie", life: 8000});
                // alert("absence de données sur la date choisie");

            }

        }, erreur => {
            console.log(erreur)
            this.tourner=false;
            this.erreur=true;

        })
    }

    getList_PointageByDate() {
        this.pointageService.getPointageByDate(this.today).subscribe(data => {
            this.pointages = data;
            this.pointages.sort((a,b) => b.idpointage - a.idpointage);
            if( data.length == 0) {
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: "absence de données à la date choisie", life: 8000});
                // alert("absence de données sur la date choisie");

            }
        }, error => {
            console.log(error)
        })
    }
}
