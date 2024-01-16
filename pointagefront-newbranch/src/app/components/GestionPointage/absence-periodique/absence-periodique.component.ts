import { Component, OnInit } from '@angular/core';
import {Service} from "../../../models/service.model";
import {PointageService} from "../../../service/pointage.service";
import {DatePipe} from "@angular/common";
import {ExcelService} from "../../../service/excel.service";

@Component({
  selector: 'app-absence-periodique',
  templateUrl: './absence-periodique.component.html',
  styleUrls: ['./absence-periodique.component.scss']
})
export class AbsencePeriodiqueComponent implements OnInit {

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
    tab = [];
    json= {dateAbsente : null};
    date:any;
    constructor(public pointagesService: PointageService,
                public datepipe: DatePipe,public excelService: ExcelService,) {
    }

    ngOnInit(): void {
        console.log(this.erreur);
    }
    getChange()
    {
        this.disabled=false;
    }
    exportAsXLSX(result){
        this.tab=[];
        console.log(this.result)

        for (let i = 0; i< this.result.length; i++){
            console.log(this.result[i]);
            this.json.dateAbsente=this.datepipe.transform(this.result[i], 'dd-MM-yyyy');
            console.log(this.json.dateAbsente);
            this.tab.push({...this.json});

        }
        console.log(this.tab)
        this.excelService.exportAsExcelFile(this.tab);
        //console.log(this.json.date)
    }
    rechercheByMatricule(date1: Date, date2: Date, matricule: any) {
        this.submitted = true;
        this.result=null;
        this.tourner=true;
        console.log(this.erreur);
            this.pointagesService.getAbsencesPeriodiqueParMatricule(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
                this.datepipe.transform(this.date2, 'yyyy-MM-dd'), matricule).subscribe(data => {
                this.result = data
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
}
