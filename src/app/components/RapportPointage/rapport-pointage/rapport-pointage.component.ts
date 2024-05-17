import { Component, OnInit } from '@angular/core';
import {Service} from "../../../models/service.model";
import {AgentService} from "../../../service/agent.service";
import {FormBuilder} from "@angular/forms";
import {ServicesService} from "../../../service/services.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {PointageService} from "../../../service/pointage.service";
import {DatePipe} from "@angular/common";
import * as FileSaver from 'file-saver';
import {Pointage} from "../../../models/pointage.model";
import {ExcelService} from "../../../service/excel.service";
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../../service/user.service";
import {Agent} from "../../../models/agent.model";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-rapport-pointage',
  templateUrl: './rapport-pointage.component.html',
    providers: [MessageService, ConfirmationService],
  styleUrls: ['./rapport-pointage.component.scss']
})
export class RapportPointageComponent implements OnInit {
    services:any[];
    currentService: Service;
    resultabsence : any[];
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
    tabdateabsence: Date[];
    dateabsence : any;
    selectedPointages: Pointage[];
    tab = [];
    json= {matricule : null, prenom: null, nom : null, service: null, datepointage: null, heureArrivee: null, heureDescente: null,cumulHeure: null, status:null};
    // tb={matricule : null,prenom: null,nom : null,date: null,arrivee: null,descente: null,cumul: null,status:null};
    tempAbsence: any;
    tabAbsence : any;
    num: number;
    tourner:boolean;
    erreur:boolean;
    cols: any;

    //absence= {matricule : null, prenom: null, nom : null, datepointage: null,service: null, status:"ABSENT(E)"}

  constructor(public agentService : AgentService,
              public fb : FormBuilder,
              public service : ServicesService,
              public pointagesService: PointageService,
              public datepipe : DatePipe,
              public excelService: ExcelService,
              public keycloak: KeycloakService,
              public userService: UserService,
              // public router : Router,
               private messageService: MessageService,
              ) { }

  ngOnInit(): void {
      this.keycloak.loadUserProfile().then( res =>
      {
          // console.log(res);
          this.users = res;
          this.username= res.username;
          // console.log(res.username);
          this.getUser(res.username);
      });

      this.getAllService();

      this.cols= [
        {field: 'matricule', header: 'matricule'.trim()},
        {field: 'prenom', header: 'prenom'.trim()},
        {field: 'nom', header: 'nom'.trim()},
        // {field: 'service', header: 'service'},
        {field: 'date', header: 'date'.trim()},
        {field: 'arrivee', header: 'arrivee'.trim()},
        {field: 'descente', header: 'descente'.trim()},
        {field: 'cumul', header: 'cumul'.trim()},
        {field: 'status', header: 'status'.trim()},
       ];
  }

    public getUser(username){
        // console.log(username);
        return this.userService.getUserByUsername(username).subscribe(data =>
        {
            // console.log(data);
            this.users = data;
            // console.log(this.users);
        })
    }


    getAllService() {
        this.service.getAllService().subscribe( data => {
                this.services = data;
                this.services.sort((a,b) => a.nomservice.localeCompare(b.nomservice));
            // },
            // error => {
            //     console.log(error)
             })


    }

    load(index) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
    }
    getAllPointage()
    {

        this.tourner=true;
        this.erreur=true;
        this.pointagesService.getPointageGlobale(this.datepipe.transform(this.date1, 'dd-MM-yyyy'),this.datepipe.transform(this.date2, 'dd-MM-yyyy')).subscribe(data => {
            this.result = data;
            this.tourner=false;
            this.erreur=false;
        }, error => {
            console.log(error)
            this.tourner=false;
            this.erreur=true;
        })
        this.currentService = null;
    }
    rechercheByService(date1: Date, date2: Date, currentService: Service) {
        this.submitted=true;

        // console.log(this.date1, this.date2, this.currentService)
        if(this.date1 && this.date2){
            this.truc=""+this.date1;
            this.truc2=""+this.date2;
        }
        if (!currentService){
            this.tourner=true;
            this.erreur=true;
            this.pointagesService.getPointageGlobale(this.datepipe.transform(this.date1, 'dd-MM-yyyy'),this.datepipe.transform(this.date2, 'dd-MM-yyyy')).subscribe(data => {
                this.result = data;
                this.tourner=false;
                this.erreur=false;
            }, error => {
                console.log(error)
                this.tourner=false;
                this.erreur=true;
            })
        }
        else if(currentService && this.truc.trim() && this.truc2.trim() ){
            console.log(this.date1, this.date2, this.currentService)
            this.tourner=true;
            this.erreur=true;
            this.pointagesService.getRapport(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),this.datepipe.transform(this.date2, 'yyyy-MM-dd'),currentService.codeservice).subscribe(data => {
                    this.result = data;
                    this.result = this.result.filter(use => use.agent.service.codeservice === this.currentService?.codeservice);

                    this.tourner=false;
                    this.erreur=false;
                    console.log(currentService);
                    console.log(this.result)
                if (this.result==" "){
                    this.messageService.add({  severity: 'success', summary: 'Success', detail: 'Motif modifié avec success', life: 8000 });
                }
                    // console.log(data)
                this.ngOnInit()
                },
                error =>  {
                    console.log(error)
                    this.tourner=false;
                    this.erreur=true;
                })
             }

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
                        this.json.status = this.result[i].motif.motif,

                        this.tab.push({...this.json});
                            // console.log(this.json)
                }
        this.excelService.exportAsExcelFile(this.tab);
        // console.log(this.tab)
    }

    exportPDF(result){
        this.tab=[];
        console.log(this.tab)
        for (let i = 0; i < this.result?.length; i++) {
            const tb={

                matricule : this.result[i]?.agent.matricule,
                prenom: this.result[i]?.agent.prenomagent,
                nom:this.result[i]?.agent.nomagent,
                service:this.result[i].agent.service.nomservice,
                date: this.result[i]?.datepointage,
                arrivee: this.result[i]?.heurearrivee,
                descente: this.result[i]?.heuredescente,
                cumul: this.result[i]?.cumulheure,
                status: this.result[i]?.motif.motif,
            };
                this.tab.push({tb});
        }
           console.log(this.tab)


        const colums= this.cols?.map(col => col.field);
        const data = this.tab?.map(row => colums?.map(col => row[col]));
             console.log(data)

        const doc = new jsPDF();

        const texte = "Rapport de présence du Servicve:  " + this.currentService.nomservice;
        doc.text(texte, 40, 20);

        const logoImg = new Image();
        logoImg.src = 'assets/layout/images/logoPoste.png';
        doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);

        autoTable(doc,{
            head: [colums],
            body: data,
            startY: 30,
        })
        console.log(this.tab);
        doc.save(this.currentService.nomservice+'_RapportPeriodiqueService.pdf');
    }


    getAbsencesParService(date1: Date, date2 :Date ,currentService: Service) {
    this.num=0;
    this.tempAbsence=[];
        for(let i = date1; i <= date2; i.setDate(i.getDate() + 1)){

            this.pointagesService.getAbsenceParDate(currentService.codeservice, this.datepipe.transform(new Date(i), 'dd-MM-yyyy')).subscribe(data => {
                this.absences = data;
                console.log(this.absences);
                for(let b=0; b<this.absences.length; b++){
                    this.tempAbsence[this.num]=this.absences[b];
                    this.num++;
                }

                // this.dateabsence = new Date(i);
                // this.tabdateabsence.push(this.dateabsence);
            },error => {
                console.log(error)
            })



            // this.absence.matricule = this.absences[i].matricule;
            // this.absence.prenom = this.absences[i].prenomagent;
            // this.absence.nom = this.absences[i].nomagent;
            // this.absence.service = this.absences[i].service.nomservice;
            // this.absence.datepointage = this.result[i].datepointage;
            // this.absence.status = "ABSENT(E)"
            //
            // this.tabAbsence.push(this.absences)
        }
         console.log(this.tempAbsence);

        // for (let i = 0; i < this.tempAbsence.length; i++) {
        //     this.absence.matricule = this.tempAbsence[i].matricule,
        //         this.absence.prenom = this.tempAbsence[i].prenomagent,
        //         this.absence.nom = this.tempAbsence[i].nomagent,
        //         this.absence.service = this.tempAbsence[i].service.nomservice,
        //         this.absence.datepointage = this.datepipe.transform(this.date1, 'dd-MM-yyyy'),
        //         this.absence.status = "ABSENT(E)",
        //
        //         this.tabAbsence.push({...this.absence});
        //     // console.log(this.json)
        //
        // }


        // console.log(this.tabdateabsence)
    }

    // exportExcel(resulta) {
    //     // @ts-ignore
    //     import("xlsx").then(xlsx => {
    //         const worksheet = xlsx.utils.json_to_sheet(resulta);
    //         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //         this.saveAsExcelFile(excelBuffer, "Rapport");
    //     });
    // }

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
    // saveAsExcelFile(result: any, fileName: string): void {
    //     let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //     let EXCEL_EXTENSION = '.xlsx';
    //     const data: Blob = new Blob([result], {
    //         type: EXCEL_TYPE
    //     });
    //     FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    // }


    exportAsXLSX2(tabAbsence: any[]) {

    }
}
