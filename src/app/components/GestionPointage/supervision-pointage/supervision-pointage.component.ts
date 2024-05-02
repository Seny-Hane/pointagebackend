import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {Pointage} from "../../../models/pointage.model";
import {Subject} from "rxjs";
import {PointageService} from "../../../service/pointage.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AgentService} from "../../../service/agent.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-supervision-pointage',
    templateUrl: './supervision-pointage.component.html',
    providers: [MessageService],
    styleUrls: ['./supervision-pointage.component.scss']
})
export class SupervisionPointageComponent implements OnInit {
    selectedPointage: Pointage;
    selectedPointages: Pointage[];
    pointages: Pointage[];
    pointage : Pointage;
    pointageSubject = new Subject<void>()
    currentTime = new Date();
    pipe = new DatePipe('en-US');
    today: string;
    todayWithPipe = null;
    cols: any[];
    rowsPerPageOptions = [5, 10, 20];
    cu: any;
    rangeDates: Date[];
    minDate: Date;
    maxDate: Date;
    invalidDates: Array<Date>;
    date1: Date;
    mat : any;

    constructor(private pointageService : PointageService,
                private agentService : AgentService,
                private messageService: MessageService,
                private router : Router,) { }

    ngOnInit(): void {

        this.today=this.todayWithPipe = this.pipe.transform(this.currentTime, 'dd-MM-yyyy');
        this.getListPointageByDate();

    }

    // ngOnChanges(changes : SimpleChanges) : void {
    //     this.pointageSubject.subscribe(data => {
    //                 this.getAllPointage()
    //             })
    //
    // }

    // ngAfterViewChecked() : void {
    //     this.pointageSubject.subscribe(data => {
    //         this.getAllPointage()
    //     })
    // }

    getAllPointage() {
        this.pointageService.getAllPointage().subscribe(data => {

                this.pointages = data;
                this.pointages.sort((a,b) => b.idpointage - a.idpointage);
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
            error => {
                console.log(error)
            })
    }

    getListPointageByDate() {
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
