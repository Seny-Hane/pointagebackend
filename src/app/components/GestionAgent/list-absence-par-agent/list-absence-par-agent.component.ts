import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {ExcelService} from "../../../service/excel.service";
import {AbsenceService} from "../../../service/absence.service";
import {Absence} from "../../../models/Absence";
import {Motif} from "../../../models/motif.model";
import {catchError, of, tap} from "rxjs";
import {ConfirmationService, Header, MessageService} from 'primeng/api';
import {Service} from "../../../models/service";
import {Agent} from "../../../models/agent.model";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-list-absence-par-agent',
  templateUrl: './list-absence-par-agent.component.html',
    providers: [MessageService, ConfirmationService],
  styleUrls: ['./list-absence-par-agent.component.scss'],

})
export class ListAbsenceParAgentComponent implements OnInit {
cols:any[];
    date1: Date;
    date2: Date;
    truc: string;
    truc2: string;
    result: any;
    resultat:any;
    matricule:any;
    submitted: boolean;
    currentService: Service;
    dateJour:Date = new Date();
    tourner:boolean;
    erreur:boolean=false;
    disabled:boolean=true;
    absenceDialog: boolean=false
    justiSelected : any
    p_motif:Motif
    p_service:Service;
    p_agent:Agent
    tab = [];
    json= {matricule : null, prenom: null, nom : null,motif:null, dateAbs: null};

    abs : Absence
    private listAbModi: any[] | Object;
    private listMtofi: Motif[];
    private listMotifff: any[];
    private commentaire: any;
     loading: any;


  constructor(private absenceService:AbsenceService,public datepipe: DatePipe
              ,public excelService: ExcelService,private messageService: MessageService) { }

  ngOnInit(): void {
      this.getAllMotif()
      this.cols=[
       {field:'matricule',header:'matricule'.trim()} ,
       {field:'prenom',Header:'prenom'.trim()},
       {field:'nom',header:'nom'.trim()},
       {field:'dateAbs',header:'dateAbs'.trim()},
       {field:'motif',Header:'motif'.trim()},

      ]
  }

    load(index) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
    }


    rechercheByMatricule(date1: Date, date2: Date, matricule: any) {
        this.submitted = true;
        this.result=null;
        this.tourner=true;
        this.matricule =matricule
        console.log(this.erreur);
        this.absenceService.getAbsencesPeriodiqueParAgent(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
            this.datepipe.transform(this.date2, 'yyyy-MM-dd'), matricule).subscribe(data => {
                this.result = data
                this.result = this.result.filter(use => use?.agent?.matricule === matricule);

                console.log(this.result);
               this.tourner=false;
                this.erreur=false;
            },
            error => {
                this.tourner = false;
                this.erreur=true;
            }

        )
    }

    getChange()
    {
        this.disabled=false;
    }

    exportAsXLSX(result) {
this.tab=[];
for(let i = 0; i < result.length; i++){


      this.json.matricule=this.result[i].agent.matricule,
     this.json.prenom=this.result[i].agent.prenomagent,
      this.json.nom = this.result[i].agent.nomagent,
     this.json.dateAbs=this.result[i].dateAbs,
      this.json.motif=this.result[i].motif.motif

     this.tab.push({...this.json})


}
this.excelService.exportAsExcelFile(this.tab);
    }

    exportTableToPDF(result) {
    this.tab=[];
    console.log(this.result)
    // if (!result || !result.length) {
    //     console.error('Le tableau de résultats est vide ou indéfini.');
    //     return;
    // }
    for (let i = 0; i < result.length; i++) {
        const agent = this.result[i].agent;
     const tb={
        matricule:this.result[i].agent.matricule,
       prenom:this.result[i].agent.prenomagent,
       nom:this.result[i].agent.nomagent,
       dateAbs:this.result[i].dateAbs,
       motif:this.result[i].motif.motif



     } ;
     this.tab.push(tb);
    }
    console.log(this.tab);
    const columns = this.cols?.map(col => col.field);
        const data = this.tab?.map(row => columns?.map(col => row[col]));
        console.log(data);

        const doc = new jsPDF();
        const texte="Absence par Agent"+(this.currentService? this.currentService.nomservice:"");
        doc.text(texte, 40, 20);

        const logoImg = new Image();
        logoImg.src = 'assets/layout/images/logoPoste.png';
        doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);

        autoTable(doc, {
            head: [columns],
            body: data,
            startY: 30,
        });
        doc.save((this.currentService ? this.currentService.nomservice : "") + 'Absence par Agent.pdf');

    }

    getAllMotif(){
      this.absenceService.getAllMotif().subscribe((data)=>{
          this.listMtofi= data;
          console.log(this.listMtofi)
      })
    }

    editAbs(abs: any) {
        this.abs= {...abs}
        console.log(this.abs);
        this.p_agent=abs.agent
        this.justiSelected=abs.motif
        this.p_service=abs.service
        this.commentaire=abs.commentaire
        this.absenceDialog=true;

    }

    hideDialog() {
        this.absenceDialog = false;
        this.submitted = false;


    }

    updateAbsence() {
        this.submitted = true;
        //this.abs.motif = this.justiSelected;
       // this.abs.commentaire = this.commentaire;
       console.log(this.abs)
            this.absenceService.putAbs(this.abs.id, this.abs).subscribe(
                (data)=> {
                    this.listAbModi = data;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Motif modifié avec success',
                        life: 8000
                    });
                    this.absenceService.getAbsencesPeriodiqueParAgent(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
                        this.datepipe.transform(this.date2, 'yyyy-MM-dd'), this.matricule).subscribe(data => {
                        this.result = data
                        this.result = this.result.filter(use => use?.agent?.matricule === this.matricule);

                        console.log(this.result);
                        this.tourner = false;
                        this.erreur = false;

                    })
                    this.absenceDialog = false;

                });

        }


    filterMotif(event)
    {

        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.listMtofi.length; i++) {
            const Motif = this.listMtofi[i];
            if (Motif.motif.toLowerCase().indexOf(query) == 0) {


                filtered.push(Motif);
            }
        }

        this.listMotifff = filtered;

    }

}
