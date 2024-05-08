import { Component, OnInit } from '@angular/core';
import {Pointage} from "../../../models/pointage.model";
import {PointageService} from "../../../service/pointage.service";
import {Router} from "@angular/router";
import {element} from "protractor";
import {ConfirmationService, MessageService} from "primeng/api";
import {Subject} from "rxjs";

@Component({
  selector: 'app-list-pointage',
  templateUrl: './list-pointage.component.html',
    providers: [MessageService],
  styleUrls: ['./list-pointage.component.scss']
})
export class ListPointageComponent implements OnInit {
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
    tourner:boolean;
    erreur:boolean;
  constructor(private pointageService : PointageService,
              private messageService: MessageService,
              private router : Router,) { }

  ngOnInit(): void {

      this.triTime = this.currentTime.getHours() > 5 && this.currentTime.getHours() < 13;

      this.getAllPointage();

      this.pointageSubject.subscribe(data => {
          this.getAllPointage()
      })


  }

  getAllPointage() {
      this.tourner=true;
      this.pointageService.getAllPointage().subscribe(data => {

          this.pointages = data;
             // console.log(this.pointages)
          this.tourner=false;
          this.erreur = false;
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
          error => {
          this.tourner=false;
          this.erreur=true;
          console.log(error)
          })
  }

    getListPointageByDate(date1: Date) {

        let formatted_date = this.date1.getDate() + "-" + (this.date1.getMonth() + 1) + "-" + this.date1.getFullYear()
        this.pointageService.getPointageByDate().subscribe(data => {
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


