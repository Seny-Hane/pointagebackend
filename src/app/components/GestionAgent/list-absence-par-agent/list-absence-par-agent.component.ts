import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {ExcelService} from "../../../service/excel.service";
import {AbsenceService} from "../../../service/absence.service";
import {Absence} from "../../../models/Absence";
import {Motif} from "../../../models/motif.model";
import {catchError, of, tap} from "rxjs";
import {ConfirmationService, MessageService} from 'primeng/api';
import {Service} from "../../../models/service";
import {Agent} from "../../../models/agent.model";
@Component({
  selector: 'app-list-absence-par-agent',
  templateUrl: './list-absence-par-agent.component.html',
    providers: [MessageService, ConfirmationService],
  styleUrls: ['./list-absence-par-agent.component.scss'],

})
export class ListAbsenceParAgentComponent implements OnInit {

    date1: Date;
    date2: Date;
    truc: string;
    truc2: string;
    result: any;
    resultat:any;
    matricule:any;
    submitted: boolean;
    dateJour:Date = new Date();
    tourner:boolean;
    erreur:boolean=false;
    disabled:boolean=true;
    absenceDialog: boolean=false
    justiSelected : any
    p_motif:Motif
    p_service:Service;
    p_agent:Agent


    abs : Absence
    private listAbModi: any[] | Object;
    private listMtofi: Motif[];
    private listMotifff: any[];
    private commentaire: any;


  constructor(private absenceService:AbsenceService,public datepipe: DatePipe
              ,public excelService: ExcelService,private messageService: MessageService) { }

  ngOnInit(): void {
      this.getAllMotif()
  }


    rechercheByMatricule(date1: Date, date2: Date, matricule: any) {
        this.submitted = true;
        this.result=null;
        this.tourner=true;
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

    exportAsXLSX(result: any) {

    }

    exportTableToPDF() {

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
        this.abs.motif = this.justiSelected;
        this.abs.commentaire = this.commentaire;
       console.log(this.abs)
            this.absenceService.putAbs(this.abs.id, this.abs).subscribe(
                (data)=>{
                   this.listAbModi=data;
                    this.messageService.add({  severity: 'success', summary: 'Success', detail: 'Motif modifié avec success', life: 8000 });
            })

            this.absenceDialog = false;
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
