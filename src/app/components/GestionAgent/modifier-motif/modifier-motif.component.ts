import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Roles} from "../../../models/roles";
import {environment} from "../../../../environments/environment";
import {Users} from "../../../models/users";
import {Sauvegarde} from "./Sauvegarde";
import {formatDate} from "@angular/common";
import {UserService} from "../../../service/user.service";

    @Component({
        selector: 'app-modifier-motif',
        template:`
        <div class="col-12 lg:col-8">
            <p-toast
                [showTransformOptions]="'translateY(100%)'"
                [showTransitionOptions]="'1000ms'"
                [hideTransitionOptions]="'1000ms'"
                [showTransformOptions]="'translateX(100%)'" ></p-toast>
            <div class="card">

                <h5 *ngIf="utilisateur">Affectation role pour {{utilisateur.prenom}} {{utilisateur.nom}} ({{utilisateur.matricule}})</h5>
                <p-pickList [source]="rol" [target]="targetroless" sourceHeader="From" targetHeader="To"
                            dragdrop="true"
                            [responsive]="true" [sourceStyle]="{'height':'250px'}" [targetStyle]="{'height':'250px'}">
                    <ng-template let-role pTemplate="item">
                        <div *ngIf="role">{{role.description}}</div>
                        <div *ngIf="!role"></div>
                    </ng-template>
                </p-pickList>
                <br> <br>
                <div class="p-formgrid grid">
                    <div class="field col">
                        <p-button label="Précèdent" (onClick)="prevPage()" icon="pi pi-angle-left" iconPos="left" class="p-toolbar-group-right"></p-button>
                    </div>
                    <div class="field col" style="margin-right:-280%;">
                        <button pButton pRipple type="button" label="Déaffectation" align="right" class="p-button-danger mr-2 mb-2" (click)="Deaffection()" iconPos="right"></button>
                    </div>
                    <div class="field col" style="margin-left:250%;">
                        <button pButton pRipple type="button" label="Affection" align="right" class="p-button-success mr-2 mb-2" (click)="nextPage()" iconPos="right"></button>
                    </div>
                </div>

        </div>
        </div>`
    })
 // styleUrls: ['./modifier-motif.component.scss']

export class ModifierMotifComponent implements OnInit {
        user: Users[];
      //  roles: Roles[];
        utilisateur:Users;
        targetroless: Roles[];
        currentDate : String;
         rol: Roles[];
        a:number;
        z:number;
        test:number
        test2:number;
        testadd:any;
        userrole:  any;
        suppuserrole:  any;
        lastsupp:any;
         rolesss: Roles[];
         utili: Users;
        newtargetroles: Roles[];
  constructor(private userService :UserService, public sauvegarde: Sauvegarde,private router: Router , private http: HttpClient ,private messageService: MessageService) { }

  ngOnInit(): void {

      this.utilisateur=this.sauvegarde.Users_Information;
      console.log(this.sauvegarde.Users_Information.roles)
     // this.haveAllRoles();
      this.http.get<Roles[]>(environment.apiUrl+`/role`).subscribe (

          (data:Roles[])=>
          {
              this.rol=data
              console.log(this.rol)
                for(let l = 0; l < this.sauvegarde.Users_Information?.roles.length; l++){
              this.rol = this.rol.filter(use => use.authority !== this.sauvegarde.Users_Information.roles[l].authority);
               }

          }
      );

      this.utili={}
      this.rolesss=[]
      this.suppuserrole=[]
      this.testadd=[]
      this.userrole=[]
      this.lastsupp=[]
      console.log(typeof this.targetroless)

      this.userService.getUserById(this.utilisateur.id).subscribe((data)=>{
              this.utili=data;
          console.log(this.utili)
          }
      )

      this.targetroless=this.sauvegarde.Users_Information.roles;
      this.newtargetroles=this.targetroless;

  }


    // haveAllRoles() {
    //     this.http.get<Roles[]>(environment.apiUrl+`/role`).subscribe (
    //
    //         (data:Roles[])=>
    //         {
    //             this.rol=data
    //             console.log(this.rol)
    //           //  for(let l = 0; l < this.sauvegarde.Users_Information?.role.length; l++){
    //                 this.rol = this.rol.filter(use => use.authority !== this.sauvegarde.Users_Information.role.authority);
    //            // }
    //
    //         }
    //     );
    //
    //
    // }

    prevPage() {
        this.router.navigate(['gestion/attributionroles']);

    }

    nextPage() {
        this.currentDate = formatDate(new Date(),'dd-MM-yyyy', 'en');
        console.log('Verification')
        console.log(this.targetroless)
        this.sauvegarde.RoleInformation = this.targetroless;
        this.utilisateur=this.sauvegarde.Users_Information;
        this.utilisateur.roles=this.sauvegarde.RoleInformation;
        console.log(this.utilisateur)
        console.log(this.targetroless)
        this.userService.updateUser(this.utilisateur.id,this.targetroless).subscribe((data)=>{
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Affectation réussi', life: 3000});

        },(error) => {
            this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Affectation Non réussi', life: 3000});

            })


    }
        Deaffection() {
            console.log('Verification')
            this.test=this.utili.roles.length;
            for(let k=0; k<this.test; k++){
                        this.suppuserrole[k]={}
                        this.suppuserrole[k].role={}
                        this.suppuserrole[k].user={}
                        this.suppuserrole[k].role=this.utili.roles[k];
                        this.suppuserrole[k].user=this.utilisateur;
                        this.lastsupp[k]=this.suppuserrole;
                    }
                  console.log(this.lastsupp[0])

            this.userService.RemoveRoleToUser(this.lastsupp[0]).subscribe((data)=>{
                this.messageService.add({severity: 'info', summary: 'info', detail: 'Deaffectation réussi', life: 3000});

               // this.messageService.add({severity: 'danger', summary: 'Successful', detail: 'Deaffectation réussi', life: 3000});

            },(error) => {
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Affectation Non réussi', life: 3000});

            })


        }


        // Affecter() {
        //     this.a=0;
        //     this.test=this.utili.roles.length;
        //     this.test2=this.newtargetroles.length;
        //     console.log('Verification')
        //     console.log(this.newtargetroles)
        //     console.log(this.test)
        //     if(this.utili.roles.length==0){
        //         this.Affectation()
        //     }
        //     else {
        //         let that= this
        //       //  this.Desaffectation()
        //         setTimeout(function (){
        //             that.Affectation()
        //
        //         },100)
        //     }
        // }

         Affectation() {
            for(let v=0; v<this.test2; v++){
                this.testadd[v]={}
                this.testadd[v].role={}
                this.testadd[v].user={}
                this.testadd[v].role=this.newtargetroles[v];
                this.testadd[v].user=this.utilisateur;
                this.userrole[v]=this.testadd;
            }
            console.log("Bismillah")
            console.log(this.userrole)
            console.log("Creer")
            this.userService.updateUser(this.utilisateur.id,this.userrole[0]).subscribe((data)=>{
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Affectation réussi', life: 3000});

            },(error) => {
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Affectation Non réussi', life: 3000});

            })

        }

        //  Desaffectation() {
        //     for(let k=0; k<this.test; k++){
        //         this.suppuserrole[k]={}
        //         this.suppuserrole[k].role={}
        //         this.suppuserrole[k].user={}
        //         this.suppuserrole[k].role=this.utili.roles[k];
        //         this.suppuserrole[k].user=this.utilisateur;
        //         this.lastsupp[k]=this.suppuserrole;
        //     }
        //     console.log("Bismillah")
        //     console.log(this.lastsupp[0])
        //     console.log("Delete")
        //     this.userService.RemoveRoleToUser(this.utilisateur.id,this.lastsupp[0]).subscribe((data)=>{
        //         this.messageService.add({key: 'c',severity: 'success', summary: 'Successful', detail: 'Déaffectation réussi', life: 3000});
        //
        //         //this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Affectation réussi', life: 3000});
        //
        //     },(error) => {
        //         this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Affectation Non réussi', life: 3000});
        //
        //     })
        //
        //
        // }
    }
