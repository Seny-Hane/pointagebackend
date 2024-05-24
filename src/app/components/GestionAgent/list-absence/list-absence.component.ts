import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {AgentService} from "../../../service/agent.service";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PointageService} from "../../../service/pointage.service";
import {DatePipe} from "@angular/common";
import {AbsenceService} from "../../../service/absence.service";
import {Absence} from "../../../models/Absence";
import {Motif} from "../../../models/motif.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {Subject} from "rxjs";
import {Service} from "../../../models/service";
import {Agent} from "../../../models/agent.model";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {ExcelService} from "../../../service/excel.service";

@Component({
  selector: 'app-list-absence',
  templateUrl: './list-absence.component.html',
    providers: [MessageService, ConfirmationService],
  styleUrls: ['./list-absence.component.scss']
})
export class ListAbsenceComponent implements OnInit {
     agents: any[];
    username:any;
    user : any;
    users:any;
    submitted: boolean;
    date1: Date;
    date2: Date;
    tourner:boolean;
    erreur:boolean;
    d1: string;
    d2: string;
    result? : any[] ;
    p_motif:Motif
    p_service:Service;
    p_agent:Agent

    absenceDialog: boolean=false
    justiSelected : any
    absenceSubject  = new Subject<void>();

  motifModif:boolean=false;

    abs : Absence
    private listAbModi: any| Object;
    private listMtofi: Motif[];
    private listMotifff: any[];
    private commentaire: any;
    tab = [];

    @Input() maVariable: string;
    private listeAbs: Absence[];
     loading: any;
     resultAbs: any[];

    constructor(public agentService: AgentService,
                private pointageService: PointageService,
                public keycloak: KeycloakService,
                private http: HttpClient,
                private datepipe: DatePipe,
                private absenceService: AbsenceService,
                private messageService: MessageService,public excelService: ExcelService) {
      this.keycloak.loadUserProfile().then( res =>
      {
           console.log(res);
          this.users = res;
          this.username= res.email;
          console.log(this.username);
          this.getUserss(this.username);

      });

  }
    public getUserss(email){
        console.log(this.username);
        return  this.http.get(environment.apiUrl +'/user/emails/'+this.username).subscribe(data =>
        {
            this.user = data
            console.log( this.user );

        })
    }


    ngOnInit(): void {

        this.getAllMotif()
     //   this.getAllAbs()


  }

  getAllAbs(){
        this.absenceService.getAllAbs().subscribe((data)=>{
            this.listeAbs=data;
            console.log(this.listeAbs)
        })
  }
    load(index) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
    }



    // getAllAgentAbs() {
    //     console.log( this.user );
    //     this.agentService.getListAgentAbsenceByService(this.user?.service?.codeservice).subscribe(data => {
    //             this.agents = data;
    //             console.log(this.agents)
    //         },
    //         error => {
    //             console.log(error)
    //         })
    // }
    rechercheByService(date1: Date, date2: Date) {
        this.submitted=true
        this.tourner=true
        this.d1 = this.datepipe.transform(this.date1, 'yyyy-MM-dd');
        this.d2 = this.datepipe.transform(this.date2, 'yyyy-MM-dd');
        console.log(this.d1,this.d2)
        console.log(this.user)

        if (this.d1 && this.d2){
            console.log( this.user );
            this.absenceService.getAbsencesPeriodiqueParInterDate(this.d1,this.d2,this.user.service.codeservice).subscribe((data)=>{
                this.result=data
                console.log(this.user.service?.codeservice)
                this.resultAbs = this.result.filter(use => use.service?.codeservice === this.user.service?.codeservice);
                this.tourner=false;
               console.log(this.resultAbs)
                return this.resultAbs;

            })

        }


    }

    getAllMotif(){
        this.absenceService.getAllMotif().subscribe((data)=>{
            this.listMtofi= data;
            console.log(this.listMtofi)
        })
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


    exportAsXLSX(services) {
        this.tab = [];
        for (let i = 0; i < services.length; i++) {
            // Crée un nouvel objet json à chaque itération pour éviter les références partagées
            let json = {
                Matricule: services[i].agent.matricule,
                Prenom: services[i].agent.prenomagent,
                Nom: services[i].agent.nomagent,
                DateAbsence: services[i].dateAbs,
                Motif: services[i].motif.motif,

            };

            // Ajoute le nouvel objet json au tableau
            this.tab.push(json);
        }
        // Appelle la méthode d'exportation une fois le tableau rempli
        this.excelService.exportAsExcelFile(this.tab);
    }

    exportPDF(result: any[]) {
        this.tab = [];

        // Construire le tableau des données
        for (let i = 0; i < result.length; i++) {
            const tb = {
                Matricule: result[i].agent.matricule,
                Prenom: result[i].agent.prenomagent,
                Nom: result[i].agent.nomagent,
                DateAbsence: result[i].dateAbs,
                Motif: result[i].motif.motif,

            };
            this.tab.push(tb);
        }

        // Définir les colonnes avec les titres corrects
        const columns = [
            { title: "Matricule", dataKey: "Matricule" },
            { title: "Prenom", dataKey: "Prenom" },
            { title: "Nom", dataKey: "Nom" },
            { title: "DateAbsence", dataKey: "DateAbsence" },
            { title: "Motif", dataKey: "Motif" },

        ];

        const doc = new jsPDF();

        const texte = "Liste des services " + (this.user ? this.user.service.nomservice : "");
        doc.text(texte, 90, 20);

        const logoImg = new Image();
        logoImg.src = 'assets/layout/images/logoPoste.png';
        doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);

        autoTable(doc, {
            head: [columns.map(col => col.title)],
            body: this.tab.map(row => columns.map(col => row[col.dataKey])),
            startY: 30,
            margin: { top: 30, right: 10, bottom: 10, left: 10 },
            styles: {
                fontSize: 8,  // Taille de police pour le contenu
                cellPadding: 3,  // Marges internes des cellules
            },
            headStyles: {
                fontSize: 10,  // Taille de police pour l'en-tête
                fillColor:[0, 0, 255],  // Couleur de fond de l'en-tête
                textColor: 255 // Couleur du texte de l'en-tête
            },
            columnStyles: {
                Matricule: { cellWidth: 'auto' },
                Prenom: { cellWidth: 'auto' },
                Nom: { cellWidth: 'auto' },
                DateAbsence: { cellWidth: 'auto' },
                Motif: { cellWidth: 'auto' },

            }
        });

        doc.save((this.user ? this.user.service?.nomservice : "") + 'Liste Services.pdf');
    }



    editAbs(abs) {
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
        // this.abs.motif = this.justiSelected;
        // this.abs.commentaire = this.commentaire;

        this.absenceService.putAbs(this.abs.id, this.abs).subscribe(
            (data)=>{
                this.listAbModi=data;
                this.abs.motif.motif =this.listAbModi.motif.motif;
                this.listMtofi;
                this.messageService.add({  severity: 'success', summary: 'Success', detail: 'Motif modifié avec success', life: 8000 });
                if (this.d1 && this.d2){
                   // console.log( this.user );
                    this.absenceService.getAbsencesPeriodiqueParInterDate(this.d1,this.d2,this.user.service.codeservice).subscribe((data)=>{
                        this.result=data
                        this.resultAbs = this.result.filter(use => use.service?.codeservice === this.user.service?.codeservice);
                        this.tourner=false;
                       // console.log(this.resultAbs)
                        return this.resultAbs;

                    })

                }
                this.absenceSubject.next();
                this.abs
            })
         //window.location.reload()
        this.motifModif=true;
        this.absenceDialog = false;




}



}
