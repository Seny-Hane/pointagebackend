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
import { Agent } from 'src/app/models/agent.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AgentService } from 'src/app/service/agent.service';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'primeng/api';


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
    hasAccess: boolean;
    d2: string;
    result : any;
    selectedPointages: Pointage[];
    tab = [];
    json= {matricule : null, prenom: null, nom : null,  datepointage: null, heureArrivee: null, heureDescente: null,cumulHeure: null, statut:null};
    cols: any;
    currentService: Service;
     loading: any;
    pointDialog: boolean;
    pointage: Pointage = new Pointage();
    addagent: Agent;
    formattedDate: string;
    selectedDate: Date
    matricule: string;
    selectedPointage: any;


  constructor(private pointageService: PointageService,public keycloak: KeycloakService,
              private http: HttpClient, private datepipe: DatePipe,
              public excelService: ExcelService,
              private fb: FormBuilder,
              private pointageservice: PointageService,
              private agentService: AgentService,
              private userService: UserService,
              private messageService: MessageService,) {

      this.addagent= new Agent();
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

  public getUser(email){
    return  this.userService.getUserByUsername(email).subscribe(data =>
    {
        this.user=data;
        console.log( this.user );
    })
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
    {field: 'statut', header: 'statut'.trim()},
   ];

    this.matricule="";
  }

  FormControlPointage = this.fb.group({
    matricule: [null, [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7)
    ]],
    heuredescente: [null, Validators.required],
  });

//  PointageNow(pointage) {
    //  const heureDescentValue = this.FormControlPointage.get('heuredescente')?.value;
    //  this.agentService.getAgentByMatricule(this.pointage.agent.matricule).subscribe(agentData => {
    //   let selectedDateDescente: Date | undefined = undefined;
    //   if (heureDescentValue) {
    //      const [heureDescent, minutesDescent] = heureDescentValue.split(':').map(Number);
    //      selectedDateDescente = new Date();
    //      selectedDateDescente.setHours(heureDescent);
    //      selectedDateDescente.setMinutes(minutesDescent);
    //      console.log(selectedDateDescente);
    //    }
    //    let pointageTest = new Pointage();
    //    pointageTest.agent = agentData;
    //   if (selectedDateDescente) {
    //       pointageTest.heuredescente = selectedDateDescente;
    //    }

    //   this.pointageService.controlePointageSoir(this.pointage.agent.matricule).subscribe(data => {
    //      if (data == false){
    //        // this.hideDialog();
    //        this.messageService.add({severity: 'error', summary: 'Erreur', detail: this.pointage.agent.prenomagent+' '+this.pointage.agent.nomagent+" a déjà pointé ce soir. ", life: 8000});
    //      }
    //      else if(data == true){
    //        this.agentService.addPointageSortie(this.pointage.agent.matricule,pointageTest).subscribe(data => {

    //          // this.hideDialog();

    //          this.messageService.add({severity: 'success', summary: 'Succes', detail: this.pointage.agent.prenomagent+' '+this.pointage.agent.nomagent+' a pointé avec succés. ', life: 8000});
    //          // this.pointageSubject.next();
    //          this.pointage.agent.matricule=undefined;
    //        },
    //          error => {
    //          console.log(error)
    //        })
    //      } error => {
    //      console.log(error)
    //      }
    //    })
    //  })
//  }
    PointageNow() {
      console.log(this.selectedPointage)
      const heureArriveeValue = this.FormControlPointage.get('heurearrivee')?.value;
      const heureDescentValue = this.FormControlPointage.get('heuredescente')?.value;
      console.log('heureDescentValue:', heureDescentValue);

      let selectedDateDescente: Date | undefined = undefined;

                const [heureDescent, minutesDescent] = heureDescentValue.split(':').map(Number);
                selectedDateDescente = new Date();
                selectedDateDescente.setHours(heureDescent);
                selectedDateDescente.setMinutes(minutesDescent);
                console.log(selectedDateDescente);

                let heurARRIVEE=this.selectedPointage.heurearrivee

                const [hours, minutes] =  heurARRIVEE.split(':').map(Number);
                const selectedDate = new Date();
                selectedDate.setHours(hours);
                selectedDate.setMinutes(minutes);
                console.log(selectedDate);

                this.selectedPointage.heurearrivee = selectedDate;
               console.log(this.selectedPointage)

      // Mettre à jour l'objet pointage avec l'heure de descente sélectionnée
        this.selectedPointage.heuredescente = selectedDateDescente;
        console.log(this.selectedPointage)

      // Vérifier si l'agent a déjà pointé le soir
      // this.pointageService.controlePointageSoir(this.selectedPointage.agent.matricule).subscribe(data => {
      //   if (!data) {
      //     this.messageService.add({ severity: 'error', summary: 'Erreur', detail: `${this.selectedPointage.agent.prenomagent} ${this.selectedPointage.agent.nomagent} a déjà pointé ce soir.`, life: 8000 });
      //   } else {
          // Ajouter le pointage de sortie
          console.log(this.selectedPointage)
          this.pointageService.addPointageSortie(this.selectedPointage.idpointage, this.selectedPointage).subscribe(
            () => {
              this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Pointage modifié avec successé', life: 8000 });
              this.pointDialog = false;
              this.selectedPointage = null;

              if (this.d1 && this.d2){
                this.pointageService.getListPointageByService(this.d1,this.d2,this.user.service.codeservice).subscribe((data)=>{
                  this.result=data
                  this.result = this.result.filter(use => use.agent.service?.codeservice == this.user.service?.codeservice);
                  this.tourner=false;
                  return data;

                })
              }
              this.ngOnInit();
              this.FormControlPointage.reset();

            },
            error => {
              console.error(error);
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de l\'enregistrement du pointage.', life: 8000 });
            }
          );
        }
    //   }, error => {
    //     console.error(error);
    //     this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la vérification du pointage.', life: 8000 });
    //   });
    // }

    isAdmin() {
        this.hasAccess = false
        if (this.keycloak.getUserRoles().includes("ROLE_DRH")) {
            this.hasAccess = true

        }
        //  console.log(this.hasAccess)
        return this.hasAccess


    }
    isChefService() {
        this.hasAccess = false
        if (this.keycloak.getUserRoles().includes("ROLE_CHEFDESERVICE")) {
            this.hasAccess = true

        }

        return this.hasAccess


    }




  keyPressAlphaNumericWithCharacters(event: KeyboardEvent) {
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alphabets, space, underscore
    if (/[a-z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

    rechercheByService(date1: Date, date2: Date) {
      this.submitted=true
        this.tourner=true;
        this.d1 = this.datepipe.transform(this.date1, 'yyyy-MM-dd');
        this.d2 = this.datepipe.transform(this.date2, 'yyyy-MM-dd');
        console.log(this.d1,this.d2)

        if (this.d1 && this.d2){


          console.log( this.user.service.codeservice );
          this.pointageService.getListPointageByService(this.d1,this.d2,this.user.service.codeservice).subscribe((data)=>{
              this.result=data
             // console.log(this.user)
              this.result = this.result.filter(use => use.agent.service?.codeservice == this.user.service?.codeservice);
            //  this.result = this.result.filter(user=>user.agent.service.codeservice == this.user.service.codeservice)
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
      //    this.json.service = this.result[i].agent.service.nomservice,
          this.json.datepointage = this.result[i].datepointage,
          this.json.heureArrivee = this.result[i].heurearrivee,
          this.json.heureDescente = this.result[i].heuredescente,
          this.json.cumulHeure= this.result[i].cumulheure,
          this.json.statut = this.result[i].agent.statut_presence,

          this.tab.push({...this.json});
                          // console.log(this.json)
      }
          this.excelService.exportAsExcelFile(this.tab);
      // console.log(this.tab)
    }

    // exportPDF(result: any) {
    //   this.tab=[];
    //   for (let i = 0; i < this.result.length; i++) {
    //       const tb={
    //           matricule : this.result[i].agent.matricule,
    //           prenom: this.result[i].agent.prenomagent,
    //           nom: this.result[i].agent.nomagent,
    //           service :this.result[i].agent.service.nomservice,
    //           date: this.result[i].datepointage,
    //           arrivee: this.result[i].heurearrivee,
    //           descente: this.result[i].heuredescente,
    //           cumul: this.result[i].cumulheure,
    //           status: this.result[i].motif.motif,
    //       };
    //           this.tab.push({tb});
    //   }

    load(index) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
    }
    exportPDF(result: any) {
        this.tab=[];
        for (let i = 0; i < this.result.length; i++) {
            const tb={
                matricule : this.result[i].agent.matricule,
                prenom: this.result[i].agent.prenomagent,
                nom: this.result[i].agent.nomagent,
              //  service :this.result[i].agent.service.nomservice,
                date: this.result[i].datepointage,
                arrivee: this.result[i].heurearrivee,
                descente: this.result[i].heuredescente,
                cumul: this.result[i].cumulheure,
                statut: this.result[i].agent.statut_presence,
            };
            this.tab.push(tb);
        }

         console.log(this.tab)


      const colums= this.cols.map(col => col.field);
      const data = this.tab.map(row => colums.map(col => row[col]));
      console.log(data)

      const doc = new jsPDF();

      const texte = "Rapport de présence du Service:  " + this.user.service?.nomservice;
      doc.text(texte, 40, 20);

      const logoImg = new Image();
      logoImg.src = 'assets/layout/images/logoPoste.png';
      doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);

      autoTable(doc,{
          head: [colums],
          body: data,
          startY: 30,
      })
      doc.save(this.currentService?.nomservice+'_RapportPeriodiqueService.pdf');
    }


    UpdateDescente(pointage){
      this.pointDialog= true;
      this.submitted= true;
      this.selectedPointage = pointage;
      console.log(this.selectedPointage)
   }

   Cancel(){
    this.pointDialog= false;
    this.submitted= false;
   }
  }
