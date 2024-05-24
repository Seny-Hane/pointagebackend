import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmationService, Header, MessageService } from 'primeng/api';
import { TypeService } from '../../models/typeService.model';
import {ServicesService} from "../../service/services.service";
import {Drp} from "../../models/drp";
import {Service} from "../../models/service.model";
import {ExcelService} from "../../service/excel.service";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


@Component({
  selector: 'app-services-poste',
  templateUrl: './services-poste.component.html',
  styleUrls: ['./services-poste.component.scss'],
  providers: [ServicesService,MessageService,ConfirmationService]
})
export class ServicesPosteComponent implements OnInit {
  drps:Drp[];
  filteredDrp:Drp[];
  drp:Drp;
  tourner:boolean;
  erreur:boolean;
  submitted: boolean;
  services: any[];
  cols:any[];
  service:Service;
  agentDialog: boolean;
  agentDialogEdit: boolean;
  currentService: Service;
  servicesSubjet=new  Subject<void>()
  typeService:TypeService;
  typeServices:TypeService[];
  //service:Service[];
tab=[];
json={nomservice:null,numeroservice:null,codepostal:null,
  codeips:null,adresse:null,drp:null,typeService:null}

    serviceZone :string='ZONE';


  constructor(
    public serviceService : ServicesService,
    public router:Router,private confirmationService: ConfirmationService,
    private messageService:MessageService, public excelService: ExcelService
    )
    {

   }



  ngOnInit(): void {
    this.getAllService();
    this.getAllDrp();
    //this.getAllService();
    this.getAllTypeService();
  //  this.servicesSubjet.subscribe(data=>{
    //  this.getAllService()

  }
//   exportAsXLSX(services){
//     this.tab=[]
// for (let i = 0; i < services.length; i++) {
//   console.log(services)
//   this.json.nomservice=this.services[i].nomservice,
//   this.json.numeroservice=this.services[i].numeroservice,
//   this.json.codepostal=this.services[i].codepostal,
//   this.json.codeips=this.services[i].codeips,
//   this.json.adresse=this.services[i].adresse,
//   this.json.drp=this.services[i].drp?.libelle,
//   this.json.typeService=this.services[i].typeService?.libelle,
//
//   console.log(services)
//   this.tab.push({...this.json})
//     console.log(this.tab)
// }
// this.excelService.exportAsExcelFile(this.tab);
//   }
    exportAsXLSX(services) {
        this.tab = [];
        for (let i = 0; i < services.length; i++) {
            // Crée un nouvel objet json à chaque itération pour éviter les références partagées
            let json = {
                nomservice: services[i].nomservice,
                numeroservice: services[i].numeroservice,
                codepostal: services[i].codepostal,
                codeips: services[i].codeips,
                adresse: services[i].adresse,
                drp: services[i].drp?.libelle,
                typeService: services[i].typeService?.libelle,
            };

            // Ajoute le nouvel objet json au tableau
            this.tab.push(json);
        }
        // Appelle la méthode d'exportation une fois le tableau rempli
        this.excelService.exportAsExcelFile(this.tab);
    }

  getAllService() {
    this.serviceService.getAllService().subscribe( data => {
            this.services = data;
            this.tourner=false;
            this.erreur = false;
            this.services.sort((a,b) => a.nomservice.localeCompare(b.nomservice));
            console.log(this.services)
        },
        error => {
          this.tourner=false;
          this.erreur=true;
          console.log(error)
          })
     //this.ngOnInit()
  }
    getAllDrp(){
      this.serviceService.getAllDrp().subscribe (data =>{
        this.drps=data;
             this.drps =  this.drps.filter(drp=>drp?.libelle.includes("DR ZONE"));
              console.log(this.drps)},
        error => {
          this.tourner=false;
          this.erreur=true;
          console.log(error)
          },

      )
        }
    getAllTypeService(){
    this.serviceService.getAllTypeService().subscribe(data=>{
    this.typeServices=data;
    console.log(this.typeServices)
      },
       error => {
        this.tourner=false;
        this.erreur=true;
        console.log(error)
        },
    )}

handleNewService(){
    this.service={drp: undefined, typeService: undefined};
    this.submitted=false;
    this.agentDialog=true;

}

    handleEditService(service: Service) {
        this.service = {...service};
        this.drp=this.service.drp;
        this.typeService = this.service.typeService;
       // this.agentDialogEdit = true;
        this.agentDialog = true;

    }
    hideDialog() {
      this.agentDialog = false;
      this.agentDialogEdit = false;
      this.submitted = false;
    }
    saveService(){
        this.submitted=true;
        console.log(this.drp);
        console.log(this.typeService);
        if (this.service.nomservice.trim() && this.service.numeroservice.trim()) {
        if (this.service.codeservice) {
            this.service.drp = this.drp;
            this.service.typeService = this.typeService;
            //agent.service.codeservice = this.currentService.codeservice;
            this.serviceService.updateService(this.service, this.service.codeservice).subscribe(data => {
                    this.getAllService();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Service mis à jour',
                        life: 3000
                    });

                    //location.reload()
                },
                error => {
                    console.log(error)
                }
            )

        } else {
            this.service.drp = this.drp;
            this.service.typeService = this.typeService;
            this.service.datecreation = null;
            console.log(this.service);
            this.serviceService.postService(this.service).subscribe(data => {
                    this.getAllService();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Service Ajouté',
                        life: 3000
                    });

                    console.log(this.service)
                },
                error => {
                    console.log(error)
                })
        }
        this.services = [...this.services];
        this.agentDialog = false;
        this.service = {drp: null, typeService: null};
    }
    }

    // deleteService(service: Service){
    //     this.confirmationService.confirm({
    //         message: 'Etes-vous sûr de vouloir supprimer ' + service.nomservice + ' ?',
    //         header: 'Confirmation',
    //         icon: 'pi pi-exclamation-triangle',
    //         acceptLabel: 'Oui',
    //         rejectLabel: 'Non',
    //         accept: () => {
    //             this.services = this.services.filter(val => val.codeservice !== service.codeservice);
    //             this.serviceService.deleteService(service.codeservice).subscribe(data =>
    //                 {
    //                     this.getAllService();
    //                 },
    //                 error => {
    //                     console.log(error);
    //                 }
    //             );
    //             this.service = {drp:null, typeService:null};
    //             this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Service Supprimé', life: 3000});
    //         }
    //     });
    // }
    filterItemsDrp(event) {
      let filtered : Drp[] = [];
      let query = event.query;
      for(let i = 0; i < this.drps.length; i++) {
          let item = this.drps[i];
          if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(item);
          }
      }
      this.drps = filtered;
    }
    filterItemsTypeService(event) {
      let filtered : any[] = [];
      let query = event.query;
      for(let i = 0; i < this.typeServices.length; i++) {
          let item = this.typeServices[i];
          if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(item);
          }
      }
      this.typeServices = filtered;
    }

    // exportTableToPDF(services: any[]) {
    //     this.tab=[];
    //     //console.log(this.services)
    //     for (let i = 0; i < services.length; i++) {
    //         const tb={
    //             Nomservice:this.services[i].nomservice,
    //             Numeroservice:this.services[i].numeroservice,
    //             Codepostal:this.services[i].codepostal,
    //             Codeips:this.services[i].codeips,
    //             Adresse:this.services[i].adresse,
    //             Drp:this.services[i].drp?.libelle,
    //             TypeService:this.services[i].typeService?.libelle
    //         } ;
    //         this.tab.push(tb);
    //     }
    //     console.log(this.tab);
    //     const columns = this.cols?.map(col => col.field);
    //     const data = this.tab?.map(row => columns?.map(col => row[col]));
    //     console.log(data);
    //
    //     const doc = new jsPDF();
    //
    //     const texte="Liste services"+(this.currentService? this.currentService.nomservice:"");
    //     doc.text(texte, 90, 20);
    //
    //     const logoImg = new Image();
    //     logoImg.src = 'assets/layout/images/logoPoste.png';
    //     doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);
    //
    //     autoTable(doc, {
    //         head: [columns],
    //         body: data,
    //         startY: 30,
    //     });
    //     doc.save((this.currentService ? this.currentService.nomservice : "") + 'Liste Services.pdf');
    //
    // }
    exportTableToPDF(services: any[]) {
        this.tab = [];

        // Construire le tableau des données
        for (let i = 0; i < services.length; i++) {
            const tb = {
                Nomservice: services[i].nomservice,
                Numeroservice: services[i].numeroservice,
                Codepostal: services[i].codepostal,
                Codeips: services[i].codeips,
                Adresse: services[i].adresse,
                Drp: services[i].drp?.libelle,
                TypeService: services[i].typeService?.libelle
            };
            this.tab.push(tb);
        }

        // Définir les colonnes avec les titres corrects
        const columns = [
            { title: "Nom du service", dataKey: "Nomservice" },
            { title: "Numéro du service", dataKey: "Numeroservice" },
            { title: "Code postal", dataKey: "Codepostal" },
            { title: "Code IPS", dataKey: "Codeips" },
            { title: "Adresse", dataKey: "Adresse" },
            { title: "DRP", dataKey: "Drp" },
            { title: "Type de service", dataKey: "TypeService" }
        ];

        const doc = new jsPDF();

        const texte = "Liste des services " + (this.currentService ? this.currentService.nomservice : "");
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
                Nomservice: { cellWidth: 'auto' },
                Numeroservice: { cellWidth: 'auto' },
                Codepostal: { cellWidth: 'auto' },
                Codeips: { cellWidth: 'auto' },
                Adresse: { cellWidth: 'auto' },
                Drp: { cellWidth: 'auto' },
                TypeService: { cellWidth: 'auto' },
            }
        });

        doc.save((this.currentService ? this.currentService.nomservice : "") + 'Liste Services.pdf');
    }


}

