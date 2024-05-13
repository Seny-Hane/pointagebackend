import { Component, OnInit } from '@angular/core';
import {Pointage} from "../../../models/pointage.model";
import {PointageService} from "../../../service/pointage.service";
import {Router} from "@angular/router";
import {element} from "protractor";
import {ConfirmationService, MessageService} from "primeng/api";
import {Subject} from "rxjs";
import {ExcelService} from "../../../service/excel.service";
import {Agent} from "../../../models/agent.model";

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Service} from "../../../models/service.model";

@Component({
  selector: 'app-list-pointage',
  templateUrl: './list-pointage.component.html',
    providers: [MessageService],
  styleUrls: ['./list-pointage.component.scss']
})
export class ListPointageComponent implements OnInit {
    selectedPointage: Pointage;
    currentService: Service;
    selectedPointages: Pointage[];
    pointages: Pointage[];
    pointage : Pointage;
    pointagesFiltres: Pointage[];
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
    result:any;
    tab = [];
    json= {matricule : null, prenom: null, nom : null, service: null, datepointage: null, heureArrivee: null, heureDescente: null,cumulHeure: null, status:null};
  constructor(private pointageService : PointageService,
              private messageService: MessageService,
              private router : Router,
              public excelService: ExcelService) { }

  ngOnInit(): void {

      this.triTime = this.currentTime.getHours() > 5 && this.currentTime.getHours() < 13;

      this.getAllPointage();

      this.pointageSubject.subscribe(data => {
          this.getAllPointage()
      })
      this.cols= [
        {field: 'matricule', header: 'matricule'.trim()},
        {field: 'prenom', header: 'prenom'.trim()},
        {field: 'nom', header: 'nom'.trim()},
         {field: 'service', header: 'service'},
        {field: 'date', header: 'date'.trim()},
        {field: 'arrivee', header: 'arrivee'.trim()},
        {field: 'descente', header: 'descente'.trim()},
        {field: 'cumul', header: 'cumul'.trim()},
        {field: 'status', header: 'status'.trim()},
        // {field: 'motif', header: 'motif'.trim()},
        
       ];

  }
  


  getAllPointage() {
      this.tourner=true;
      this.pointageService.getAllPointage().subscribe(data => {

          this.pointages = data;
             // console.log(this.pointages)
          this.tourner=false;
          this.erreur = false;
          this.result = data;
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
    exportPDF(result) {
        this.tab = [];
        for (let i = 0; i < this.result?.length; i++) {
            const agent = this.result[i]?.agent;
            const serviceNom = agent && agent.service ? agent.service.nomservice : "Service non défini";
           
    
            const tb = {
                matricule: agent?.matricule,
                prenom: agent?.prenomagent,
                nom: agent?.nomagent,
                service: serviceNom,
                date: this.result[i]?.datepointage,
                arrivee: this.result[i]?.heurearrivee,
                descente: this.result[i]?.heuredescente,
                cumul: this.result[i]?.cumulheure,
                // status:this.result[i]?.motif.motif,
            };
            this.tab.push(tb);
        }
        console.log(this.tab);
    
        const columns = this.cols?.map(col => col.field);
        const data = this.tab?.map(row => columns?.map(col => row[col]));
        console.log(data);
    
        const doc = new jsPDF();
    
        const texte = "liste pointage:  " + (this.currentService ? this.currentService.nomservice : "");
        doc.text(texte, 40, 20);
    
        const logoImg = new Image();
        logoImg.src = 'assets/layout/images/logoPoste.png';
        doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);
    
        autoTable(doc, {
            head: [columns],
            body: data,
            startY: 30,
        });
        doc.save((this.currentService ? this.currentService.nomservice : "") + 'Liste pointage.pdf');
    }
   
    exportAsXLSX(result):void {
        this.tab=[];
          for (let i = 0; i < this.result.length; i++) {
                      this.json.matricule = this.result[i].agent.matricule,
                          this.json.prenom = this.result[i].agent.prenomagent,
                          this.json.nom = this.result[i].agent.nomagent,
                          this.json.service = this.result[i].agent.service.nomservice,
                          this.json.datepointage = this.result[i].datepointage,
                          this.json.heureArrivee = this.result[i].heurearrivee,
                          this.json.heureDescente = this.result[i].heuredescente,
                          this.json.cumulHeure= this.result[i].cumulheure,
                         
  
                          this.tab.push({...this.json});
                              // console.log(this.json)
                  }
          this.excelService.exportAsExcelFile(this.tab);
          // console.log(this.tab)
      }
  
}


