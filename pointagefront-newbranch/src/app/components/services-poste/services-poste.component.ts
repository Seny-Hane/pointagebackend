import { Component, OnInit } from '@angular/core';
//import { Service } from '../models/service.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { error, log } from 'console';

//import { TypeService } from '../models/typeService.model';

import { TypeService } from '../../models/typeService.model';
import { Service } from '../../models/service.model';
import {ServicesService} from "../../service/services.service";
import {Drp} from "../../models/drp";
import {Agent} from "../../models/agent.model";
//import { Service } from '../models/service.model';


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
  services: Service[];
  service:Service;
  agentDialog: boolean;
  agentDialogEdit: boolean;
  currentService: Service;
  servicesSubjet=new  Subject<void>()
  typeService:TypeService;
  typeServices:TypeService[];
  //service:Service[];


  constructor(
    public serviceService : ServicesService,
    public router:Router,private confirmationService: ConfirmationService,
    private messageService:MessageService,
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
    //})

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
  }
    getAllDrp(){
      this.serviceService.getAllDrp().subscribe (data =>{
        this.drps=data;
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

    deleteService(service: Service){
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + service.nomservice + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.services = this.services.filter(val => val.codeservice !== service.codeservice);
                this.serviceService.deleteService(service.codeservice).subscribe(data =>
                    {
                        this.getAllService();
                    },
                    error => {
                        console.log(error);
                    }
                );
                this.service = {drp:null, typeService:null};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Service Supprimé', life: 3000});
            }
        });
    }
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
}
