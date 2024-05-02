import { Component, OnInit } from '@angular/core';
import {PointageService} from "../../../service/pointage.service";
import {DatePipe} from "@angular/common";
import {ExcelService} from "../../../service/excel.service";
import {AgentService} from "../../../service/agent.service";
import {ServicesService} from "../../../service/services.service";
import {Service} from "../../../models/service.model";
import {Pointage} from "../../../models/pointage.model";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Motif } from 'src/app/models/motif.model';
import { MotifService } from 'src/app/service/motif.service';
// import * as jsPDF from 'jspdf';
// import * as autoTable from 'jspdf-autotable';
// import 'jspdf-autotable';

@Component({
  selector: 'app-absence-journalier',
  templateUrl: './absence-journalier.component.html',
  styleUrls: ['./absence-journalier.component.scss']
})
export class AbsenceJournalierComponent implements OnInit {


    services: any[];
    currentService: Service;
    result : any;
    absences : any;
    date1: Date;
    date2: Date;
    truc: string;
    truc2: string;
    loading: any;
    users: any;
    username: any;
    submitted: boolean;
    selectedPointages: Pointage[];
    tabAbsence = [];
    absence= {matricule : null, prenom: null, nom : null, date: null,service: null, status:null};
    dt: any;
    cols: any;
    currentMotif= Motif;
    motifs: any[];
    filteredmotifs: any;

  constructor(public pointagesService: PointageService,
              public datepipe : DatePipe,
              public excelService: ExcelService,
              public agentService : AgentService,
              public service : ServicesService,
              public motifservice : MotifService,) { }

  ngOnInit(): void {

      this.getAllService()
      this.getAllMotif()

      this.cols= [
        {field: 'matricule', header: 'matricule'},
        {field: 'prenom', header: 'prenom'},
        {field: 'nom', header: 'nom'},
        {field: 'dateAbsence', header: 'dateAbsence'},
        {field: 'service', header: 'service'},
        // {field: 'motif', header: 'motif'},
      ];
  }

    getAllService() {
        this.service.getAllService().subscribe( data => {
                this.services = data;
                this.services.sort((a,b) => a.nomservice.localeCompare(b.nomservice));
            },
            error => {
                console.log(error)
            })
    }


    rechercheByService(date1: Date, currentService: Service) {
        this.submitted=true;
        console.log(date1, currentService)
        if(this.date1){
            this.truc=""+this.date1;

        }
        // if (!currentService){
        //     this.pointagesService.getPointageGlobale(this.datepipe.transform(this.date1, 'dd-MM-yyyy'),this.datepipe.transform(this.date2, 'dd-MM-yyyy')).subscribe(data => {
        //         this.result = data;
        //     }, error => {
        //         console.log(error)
        //     })
        // }
        if(this.truc.trim() ){
            // console.log(this.date1, this.date2, this.currentService)
            this.pointagesService.getAbsenceParDate(currentService.codeservice,this.datepipe.transform(this.date1, 'dd-MM-yyyy')).subscribe(data => {
                    this.result = data;
                    console.log(data)

                },
                error =>  {
                    console.log(error)
                })
        }
        // console.log(date1, date2, currentService)
    }

    filterItems2(event) {
        let filtered : any[] = [];
        let query = event.query;
        for(let i = 0; i < this.services.length; i++) {
            let item = this.services[i];
            if (item.nomservice.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }
        this.services = filtered;
    }


    getAllMotif() {
        this.motifservice.getAllMotif().subscribe(
            data => {
                this.motifs = data;
                this.motifs.sort((a,b) => a.motif.localeCompare(b.motif));
            },
            error => {
                console.log(error);
            }
        );
    }

    filterMotif(event) {
        const filtered : Motif[] = [];
        const query = event.query;
        for(let i = 0; i < this.motifs?.length; i++) {
            const item = this.motifs[i];
            if (item.motif.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                if(item.motif ==='CONGÉ' || item.motif ==='PERMISSION' || item.motif ==='MISSION' || item.motif ==='MALADE' || item.motif ==='AUTRE'){
                    filtered.push(item);
                }
            }
        }
        this.filteredmotifs = filtered;
        console.log(this.filteredmotifs);
    }



    exportAsXLSX(result):void {
        this.tabAbsence=[];
        for (let i = 0; i < this.result.length; i++) {
            this.absence.matricule = this.result[i].matricule,
                this.absence.prenom = this.result[i].prenomagent,
                this.absence.nom = this.result[i].nomagent,
                this.absence.service = this.result[i].service.nomservice,
                this.absence.date = this.datepipe.transform(this.date1, 'dd-MM-yyyy'),
                this.absence.status = "ABSENT(E)",
                // this.absence.exception= this.result[i].motif.motif,

                this.tabAbsence.push({...this.absence});
            // console.log(this.json)

        }


        this.excelService.exportAsExcelFile(this.tabAbsence);
        console.log(this.tabAbsence)

    }

    exportPDF(result){
         this.tabAbsence=[];
         for (let i = 0; i < this.result.length; i++) {
             this.absence.matricule = this.result[i].matricule,
             this.absence.prenom = this.result[i].prenomagent,
             this.absence.nom = this.result[i].nomagent,
             this.absence.date = this.datepipe.transform(this.date1, 'dd-MM-yyyy'),
             this.absence.service = this.result[i].service.nomservice,
            //  this.absence.status ="ABSENT(E)",

             this.tabAbsence.push({...this.absence});


         }
         console.log(this.absence.date)

            const colums= this.cols.map(col => col.field);
            const data = this.tabAbsence.map(row => colums.map(col => row[col]));
            console.log(data)

            const doc = new jsPDF();
            const texte = "Liste des absences journalière du Servicve:  " + this.currentService.nomservice;
            doc.text(texte, 40, 20);

            const logoImg = new Image();
            logoImg.src = 'assets/layout/images/logoPoste.png';
            doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);

            autoTable(doc,{
                head: [colums],
                body: data,
                startY: 30,
            })
            doc.save(this.currentService.nomservice+'_TabAbsencesJounaliere.pdf');
    }




}
