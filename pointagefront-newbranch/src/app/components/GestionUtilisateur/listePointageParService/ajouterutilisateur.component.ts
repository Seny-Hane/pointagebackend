import { Component, OnInit } from '@angular/core';
import {PointageService} from "../../../service/pointage.service";
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DatePipe} from "@angular/common";
import {Pointage} from "../../../models/pointage.model";
import { ExcelService } from 'src/app/service/excel.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Service} from "../../../models/service.model";


@Component({
  selector: 'app-ajouterutilisateur',
  templateUrl: './ajouterutilisateur.component.html',
  styleUrls: ['./ajouterutilisateur.component.scss']
})
export class AjouterutilisateurComponent implements OnInit {
    submitted: boolean;
    date1: Date;
    date2: Date;
    tourner:boolean;
    erreur:boolean;
    users:any;
    username:any;
    user : any;
    d1: string;
    d2: string;
    result : any;
    selectedPointages: Pointage[];
    tab = [];
    json= {matricule : null, prenom: null, nom : null, service: null, datepointage: null, heureArrivee: null, heureDescente: null,cumulHeure: null, status:null};
    cols: any;
    currentService: Service;

  constructor(private pointageService: PointageService,public keycloak: KeycloakService,
              private http: HttpClient, private datepipe: DatePipe,
              public excelService: ExcelService,) {
      this.keycloak.loadUserProfile().then( res =>
      {
          // console.log(res);
          this.users = res;
          this.username= res.email;
          console.log(this.user);
          this.getUserss(this.username);

      });
      console.log(this.user)

  }

public getUserss(email){
    return  this.http.get(environment.apiUrl +'/user/emails/'+email).subscribe(data =>
    {
        this.user = data
        console.log( this.user );

    })
}


ngOnInit(): void {
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



    rechercheByService(date1: Date, date2: Date) {
      this.submitted=true
        this.d1 = this.datepipe.transform(this.date1, 'dd-MM-yyyy');
        this.d2 = this.datepipe.transform(this.date2, 'dd-MM-yyyy');
        console.log(this.d1,this.d2)

        if (this.d1 && this.d2){


          console.log( this.user );
          this.pointageService.getListPointageByService(this.d1,this.d2,this.user.service.codeservice).subscribe((data)=>{
              this.result=data
              this.tourner=false;
              console.log(this.result)
              return data;

          })

        }


    }

    exportAsXLSX(result: any) {
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

    exportPDF(result: any) {
      this.tab=[];
      for (let i = 0; i < this.result.length; i++) {
          const tb={
              matricule : this.result[i].agent.matricule,
              prenom: this.result[i].agent.prenomagent,
              nom: this.result[i].agent.nomagent,
              // this.json.service = this.result[i].agent.service.nomservice,
              date: this.result[i].datepointage,
              arrivee: this.result[i].heurearrivee,
              descente: this.result[i].heuredescente,
              cumul: this.result[i].cumulheure,
              status: this.result[i].motif.motif,
          };  
              this.tab.push({tb});
      }
         console.log(this.tab)

      
      const colums= this.cols.map(col => col.field);
      const data = this.tab.map(row => colums.map(col => row[col]));
      console.log(data)
      
      const doc = new jsPDF();

      const texte = "Rapport de présence du Service:  " + this.currentService?.nomservice;
      doc.text(texte, 40, 20);
      autoTable(doc,{
          head: [colums],
          body: data,
          startY: 30,
      })
      doc.save(this.currentService?.nomservice+'_RapportPeriodiqueService.pdf');
    }
}
