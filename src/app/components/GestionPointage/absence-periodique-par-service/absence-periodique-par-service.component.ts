import { Component, OnInit } from '@angular/core';
import {Service} from "../../../models/service.model";
import {AgentService} from "../../../service/agent.service";
import {FormBuilder} from "@angular/forms";
import {ServicesService} from "../../../service/services.service";
import {PointageService} from "../../../service/pointage.service";
import {DatePipe} from "@angular/common";
import {ExcelService} from "../../../service/excel.service";
import {KeycloakService} from "keycloak-angular";
import {UserService} from "../../../service/user.service";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Motif } from 'src/app/models/motif.model';
import { MotifService } from 'src/app/service/motif.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {AbsenceService} from "../../../service/absence.service";

@Component({
  selector: 'app-absence-periodique-par-service',
  templateUrl: './absence-periodique-par-service.component.html',
  styleUrls: ['./absence-periodique-par-service.component.scss']
})
export class AbsencePeriodiqueParServiceComponent implements OnInit {
    services: any[];
    currentService: Service;
    resultabsence : any[];
    results: any;
    absences : any;
    date1: Date;
    date2: Date;
    date3:string;
    date4:string;
    tourner:boolean;
    erreur:boolean;
    loading: any;
    users: any;
    username: any;
    submitted: boolean;
    truc: string;
    truc2: string;
    tab = [];
    json= {matricule : null, prenom: null, nom : null,dateabsence: null};
    cols: any;
    currentMotif= Motif;
    motifs: any[];
    filteredmotifs: any;


  constructor(public agentService : AgentService,
              public fb : FormBuilder,
              public service : ServicesService,
              public pointagesService: PointageService,
              public datepipe : DatePipe,
              public excelService: ExcelService,
              public keycloak: KeycloakService,
              public userService: UserService,
              public motifservice : MotifService,
              private absenceService : AbsenceService) { }

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
      this.getAllMotif()

      this.cols= [
        {field: 'matricule', header: 'matricule'},
        {field: 'prenom', header: 'prenom'},
        {field: 'nom', header: 'nom'},
        // {field: 'datenaissance', header: 'datenaissance'},
        {field: 'dateabsence', header: 'dateabsence'},
        // {field: 'genre', header: 'genre'},
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
            },
            error => {
                console.log(error)
            })
    }

    load(index) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
    }

    rechercheAbsenceByService(date1: Date, date2: Date, currentService: Service) {
        this.submitted=true;
        this.tourner=true;
        this.erreur=true;
        console.log(currentService)
        this.absenceService.getAbsencesPeriodiqueParInterDate(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),this.datepipe.transform(this.date2, 'yyyy-MM-dd'),currentService?.codeservice).subscribe(data => {
            this.results = data;
            this.results = this.results.filter(use => use.service?.codeservice === currentService?.codeservice);

            console.log(this.results);
            this.tourner=false;
            this.erreur=false;
        }, error => {
            console.log(error)
            this.tourner=false;
            this.erreur=true;
        })
        // console.log(this.date1, this.date2, this.currentService)
/*        if(this.date1 && this.date2){
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
            // console.log(this.date1, this.date2, this.currentService)
            this.tourner=true;
            this.erreur=true;
            this.pointagesService.getRapport(this.datepipe.transform(this.date1, 'dd-MM-yyyy'),this.datepipe.transform(this.date2, 'dd-MM-yyyy'),currentService.codeservice).subscribe(data => {
                    this.result = data;
                    this.tourner=false;
                    this.erreur=false;
                    console.log(currentService);
                    // console.log(data)
                },
                error =>  {
                    console.log(error)
                    this.tourner=false;
                    this.erreur=true;
                })
            //this.getAbsencesParService(date1,date2,currentService)
            // this.pointagesService.getAbsencePeriodique(this.datepipe.transform(this.date1, 'dd-MM-yyyy'),this.datepipe.transform(this.date2, 'dd-MM-yyyy'),currentService.codeservice).subscribe(data =>{
            //     this.absences = data;
            //     this.getAbsencesParService(date1,date2,currentService)
            //     console.log(data)
            // }, error => {
            //     console.log(error)
            // })

            // this.pointagesService.getAbsenceParDate(this.datepipe.transform(this.date1, 'dd-MM-yyyy'), currentService.codeservice).subscribe(data => {
            //     console.log(data)
            // },error => {
            //     console.log(error)
            // })
            // this.pointagesService.getAbsencePeriodique(this.datepipe.transform(this.date1, 'dd-MM-yyyy'),this.datepipe.transform(this.date2, 'dd-MM-yyyy'),currentService.codeservice).subscribe(data =>{
            //     console.log(data)
            // }, error => {
            //     console.log(error)
            // })
        }*/
        // console.log(date1, date2, currentService)
    }
    filterItemsService(event) {
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
    exportAsXLSX(results):void {
        this.tab=[];
        for (let i = 0; i < this.results.length; i++) {
                this.json.matricule = this.results[i].agent.matricule,
                this.json.prenom = this.results[i].agent.prenomagent,
                this.json.nom = this.results[i].agent.nomagent,
                // this.json.datenaissance = this.results[i].datenaissance,
                this.json.dateabsence = this.results[i].dateAbs,
                // this.json.genre = this.results[i].genre,
           //     this.json.motif= this.results[i].motif,
                this.tab.push({...this.json});
            // console.log(this.json)
        }
        this.excelService.exportAsExcelFile(this.tab);
        console.log(this.tab)
    }

    exportPDF(results){
        this.tab=[];
        for (let i = 0; i < this.results.length; i++) {
            this.json.matricule = this.results[i].agent.matricule,
            this.json.prenom = this.results[i].agent.prenomagent,
            this.json.nom = this.results[i].agent.nomagent,
            // this.json.datenaissance = this.results[i].datenaissance,
            this.json.dateabsence = this.results[i].dateAbs,
            // this.json.genre = this.results[i].genre,
            this.tab.push({...this.json});
         console.log(this.json)
        }

        const colums= this.cols.map(col => col.field);
        const data = this.tab.map(row => colums.map(col => row[col]));
        console.log(data)

        const doc = new jsPDF();

        // doc.text("Liste des absences periodiques du Servicve: ", 40, 20);
        const text = "Liste des absences periodiques du Service: " + this.currentService.nomservice;
        doc.text(text, 40, 20);

        const logoImg = new Image();
        logoImg.src = 'assets/layout/images/logoPoste.png';
        doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);

        autoTable(doc,{
            head: [colums],
            body: data,
            startY: 30,
        })
        doc.save(this.currentService.nomservice+'_AbsencePeriodiqueService.pdf');
    }

    filterMotif(event) {
        const filtered : Motif[] = [];
        const query = event.query;
        for(let i = 0; i < this.motifs?.length; i++) {
            const item = this.motifs[i];
            if (item.motif.toLowerCase().indexOf(query.toLowerCase()) == 0 ) {
                if(item.motif ==='CONGÉ' || item.motif ==='PERMISSION' || item.motif ==='MISSION' || item.motif ==='MALADE' || item.motif ==='AUTRE'){
                    filtered.push(item);
                }
            }
        }

        this.filteredmotifs = filtered;

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



}
