import { Component, OnInit } from '@angular/core';
import {AbsenceService} from "../../../service/absence.service";
import {DatePipe} from "@angular/common";
import {ExcelService} from "../../../service/excel.service";
import {MessageService} from "primeng/api";
import {Absence} from "../../../models/Absence";
import {Motif} from "../../../models/motif.model";
import {Service} from "../../../models/service";
import {Agent} from "../../../models/agent.model";

@Component({
  selector: 'app-list-global-absence',
  templateUrl: './list-global-absence.component.html',
  styleUrls: ['./list-global-absence.component.scss']
})
export class ListGlobalAbsenceComponent implements OnInit {
    abs : Absence
    private listAbModi: any[] | Object;
    private listMtofi: Motif[];
    private listMotifff: any[];
    private commentaire: any;
    private listABS: Absence[];
    disabled:boolean=true;
    matricule: string
    submitted: boolean;
    tourner:boolean;
    erreur:boolean=false;
    private result: Absence[];

    justiSelected : any
    p_motif:Motif
    p_service:Service;
    p_agent:Agent
     absenceDialog: boolean;
  constructor(private absenceService:AbsenceService,public datepipe: DatePipe
,public excelService: ExcelService,private messageService: MessageService) { }

  ngOnInit(): void {
      this.getAllMotif()
   //  this.getAllListAbs()
  }

    getAllMotif(){
        this.absenceService.getAllMotif().subscribe((data)=>{
            this.listMtofi= data;
            console.log(this.listMtofi)
        })
    }

    getAllListAbs(){
        this.absenceService.getAllAbs().subscribe((data)=> {
             this.listABS = data;
            console.log(this.listABS);
        })
    }



    getChange()
    {
        this.disabled=false;
    }


    rechercheByMatricule( matricule: any) {
        this.submitted = true;
        this.result=null;
        this.tourner=true;
        console.log(this.erreur);
        this.absenceService.getAllAbsByMat(matricule).subscribe((data)=>{
                this.result= data
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
    exportAsXLSX(result: any) {

    }

    exportTableToPDF() {

    }
    hideDialog() {
        this.absenceDialog = false;
        this.submitted = false;


    }
    updateAbsence() {
        this.submitted = true;
        console.log( this.abs.motif,  this.abs.commentaire)
        console.log(this.abs)
        this.absenceService.putAbs(this.abs.id, this.abs).subscribe(
            (response)=>{
                this.listAbModi=response;
                this.listAbModi[this.abs.id]=this.abs
                this.ngOnInit()
                this.messageService.add({  severity: 'success', summary: 'Success', detail: 'Motif modifié avec success', life: 8000 });
            })
       //this.listABS
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


    editAbs(abs: any) {
        this.abs= {...abs}
        console.log(this.abs);
        this.p_agent=abs.agent
        this.justiSelected=abs.motif
        this.p_service=abs.service
        this.commentaire=abs.commentaire
        this.absenceDialog=true;

    }
}
