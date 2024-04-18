import { Component, OnInit } from '@angular/core';
import {Service} from "../../../models/service.model";
import {PointageService} from "../../../service/pointage.service";
import {DatePipe} from "@angular/common";
import {ExcelService} from "../../../service/excel.service";
import { log } from 'console';
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import * as XLSX from 'xlsx';

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
    cols: any;
    // title = 'PDFGenerator';

   
    constructor(public pointagesService: PointageService,
                public datepipe: DatePipe,public excelService: ExcelService,) {
    }

    ngOnInit(): void {
        console.log(this.erreur);
        this.cols= [
            {field: 'Date(s)Absence', header: 'Date(s)Absence'},


        ];
    }

    getChange()
    {
        this.disabled=false;
    }
    exportAsXLSX(result){
        this.tab=[];
        console.log(this.result)

        for (let i = 0; i<this.result.length; i++){
            console.log(this.result[i]);
            this.json.dateAbsente=this.datepipe.transform(this.result[i], 'dd-MM-yyyy');
            console.log(this.json.dateAbsente);
            this.tab.push({...this.json});

        }
        console.log(this.tab)

        // const wb: XLSX.WorkBook = XLSX.utils.book_new();
        // const texte = "Liste des absences periodiques de l'agent: ";
        // wb.SheetNames[0] = 'Titre de la feuille';
       
        this.excelService.exportAsExcelFile(this.tab);
        //console.log(this.json.date)
    }

//     exportPDF(result){
//         this.tab=[];
//         for (let i = 0; i< this.result.length; i++){
//             this.json.dateAbsente=this.datepipe.transform(this.result[i], 'dd-MM-yyyy');
//
// ;            this.tab.push({...this.json});
//             console.log(this.tab);
//         }
//
//         const colums= this.cols.map(col => col.field);
//         const data = this.tab.map(row => colums.map(col => row[col]));
//         // const data= this.tab;
//         console.log(data);
//         const doc = new jsPDF();
//
//         autoTable(doc,{
//             head: [colums],
//             body: data,
//
//         })
//         doc.save('AbsencePeriodiqueAgent.pdf');
//     }
    exportTableToPDF() {
        const pdf = new jsPDF();
        this.tab=[];
        for (let i = 0; i< this.result.length; i++){
            this.json.dateAbsente=this.datepipe.transform(this.result[i], 'dd-MM-yyyy');

            this.tab.push({...this.json});
            console.log(this.tab);
        }

        // Définissez les en-têtes du tableau
        const headers = [['DateAbsente']];

        // Utilisez la méthode jsPDF pour générer le tableau
        const texte = "Liste des absences periodiques de l'agent: " + this.matricule;
        pdf.text(texte, 40, 20);

        const logoImg = new Image();
        logoImg.src = 'assets/layout/images/logoPoste.png';
        pdf.addImage(logoImg, 'PNG', 15, 15, 14, 14);

        autoTable(pdf,{
            head: headers,
            body: this.tab.map(data => [data.dateAbsente]),
            startY: 30,
        });

        // Sauvegardez le fichier PDF avec un nom spécifique
        pdf.save( this.matricule+'_AbsencePeriodiqueAgent.pdf');
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
