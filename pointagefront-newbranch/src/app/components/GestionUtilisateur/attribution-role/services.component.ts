import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { TypeService } from 'src/app/models/typeService.model';
import { ServicesService } from 'src/app/service/services.service';
import { Drp } from 'src/models/drp';
import { Service } from 'src/models/service';




@Component({
    selector: 'app-services',
    template: `<div class="services-content">
            <div class="card">
            <h3 class="bg-gray-200 p-3">Service</h3>
                <div class="p-fluid">
                    <p-autoComplete placeholder="Choisir une service" id="services" [dropdown]="true" [multiple]="false" [suggestions]="filteredservices" (completeMethod)="filterServices($event)" field="libelle" [(ngModel)]="Service" ></p-autoComplete>
                    <small *ngIf="(submitted)" class="p-error">Selectionnez une service.</small>
    
                </div>
    <br><br>
                <div class="grid grid-nogutter justify-content-end">
                        <p-button label="Suivant" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                </div>
    
            </div>
    </div>`,


})

export class ServicesComponent implements OnInit {
    drps:Drp[];
    filteredDrp:Drp[];
    drp:Drp;
    tourner:boolean;
    erreur:boolean;
    submitted: boolean;
    services: any[]=[];
    service:Service;
    servicesSubjet=new  Subject<void>()
    typeService:TypeService;
    typeServices:TypeService[];
    currentService: Service;

    constructor(
        public serviceService : ServicesService,
        public router:Router,private confirmationService: ConfirmationService,
        private messageService:MessageService,
        )
        {}


    ngOnInit(): void {
        this.getAllService();
        this.getAllDrp();
        this.getAllTypeService();
    }

    getAllService() {
        this.serviceService.getAllService().subscribe( data => {
                this.services= data;
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

}