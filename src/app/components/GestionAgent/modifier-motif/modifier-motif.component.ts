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
                            (onMoveToSource)="Deaffection($event)"
                            (onMoveAllToSource)="Deaffection($event)"
                            (onMoveToTarget)="Affectation($event)"
                            (onMoveAllToTarget)="Affectation($event)"
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
<!--                    <div class="field col" style="margin-right:-280%;">-->
<!--                        <button pButton pRipple type="button" label="Déaffectation" align="right" class="p-button-danger mr-2 mb-2" (click)="Deaffection(event)" iconPos="right"></button>-->
<!--                    </div>-->
<!--                    <div class="field col" style="margin-left:250%;">-->
<!--                        <button pButton pRipple type="button" label="Affection" align="right" class="p-button-success mr-2 mb-2" (click)="nextPage()" iconPos="right"></button>-->
<!--                    </div>-->
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

      console.log(this.utilisateur=this.sauvegarde.Users_Information)
     // this.haveAllRoles();
      this.http.get<Roles[]>(environment.apiUrl+`/role`).subscribe (

          (data:Roles[])=>
          {
              this.rol=data
              console.log(this.rol)
                for(let l = 0; l < this.sauvegarde.Users_Information?.roles.length; l++){
              this.rol = this.rol.filter(use => use.authority !== this.sauvegarde.Users_Information.roles[l].authority);
                    console.log(this.rol)
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
        Deaffection(event) {
            const selectedItem1 = event.items;
            // console.log(selectedItem1)
            // console.log(this.newtargetroles)
            // console.log('Verification')
            this.test=this.newtargetroles.length;
            for(let k=0; k<selectedItem1.length; k++){
                        this.suppuserrole[k]={}
                        this.suppuserrole[k].role={}
                        this.suppuserrole[k].user={}
                        this.suppuserrole[k].role=selectedItem1[k];
                        this.suppuserrole[k].user=this.utilisateur;
                        this.lastsupp=this.suppuserrole;
                    }
                  console.log(this.lastsupp)
            console.log(this.suppuserrole)

            this.userService.RemoveRoleToUser(this.lastsupp).subscribe((data)=>{
                this.messageService.add({severity: 'info', summary: 'info', detail: 'Deaffectation réussi', life: 3000});
                this.ngOnInit()
               // this.messageService.add({severity: 'danger', summary: 'Successful', detail: 'Deaffectation réussi', life: 3000});

            },(error) => {
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Affectation Non réussi', life: 3000});

            })
         this.ngOnInit()

        }


        // Affecter() {
        //     this.a=0;
        //     this.test=this.utili.roles.length;
        //    this.test2=this.newtargetroles.length;
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

         Affectation(event) {
             console.log(event)
             const selectedItem = event.items;
             console.log(selectedItem)
             console.log(this.utili)
             console.log(selectedItem.users)
             console.log(this.utili)
             console.log(this.newtargetroles);
             selectedItem.forEach(item => {
                 const roleInfo = {
                     id: item.id,
                     authority: item.authority
                 };
                 console.log('Role Info:', roleInfo);
                 //this.utili.roles.push(roleInfo)
                 console.log(this.utili)

             });
            for(let v=0; v<this.newtargetroles.length; v++){
                this.testadd[v]={}
                this.testadd[v].role={}
                this.testadd[v].user={}
                this.testadd[v].role=this.newtargetroles[v];
                this.testadd[v].user=this.utilisateur;
                this.userrole=this.testadd;
               // selectedItem.users[0]=this.utili
                console.log(selectedItem)
                console.log(this.testadd)
                console.log(this.userrole)
            }
            console.log("Bismillah")
            console.log(this.userrole)
            console.log("Creer")
            this.userService.updateGroupRoleToUser(this.userrole).subscribe((data)=>{
               // console.log(data)
                this.ngOnInit()
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Affectation réussi', life: 3000});
            },(error) => {
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Affectation Non réussi', life: 3000});

            })
             this.ngOnInit()
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
        // removeRoleFromTarget1(event) {
        //     // Récupérer l'élément déplacé vers la liste source
        //     const selectedItem = event.items[0];
        //
        //     // Trouver l'index de l'élément dans targetroless
        //     const index = this.targetroless.indexOf(selectedItem);
        //     console.log(selectedItem)
        //     console.log(this.targetroless)
        //     // Vérifier si l'élément existe dans targetroless
        //     if (index !== -1) {
        //         // Supprimer l'élément du tableau targetroless
        //         this.targetroless.splice(index, 1);
        //         console.log("Rôle supprimé avec succès de la cible !");
        //
        //         // Appeler le service pour supprimer le rôle de l'utilisateur sélectionné
        //         this.userService.RemoveRoleToUser(selectedItem).subscribe(
        //             (data) => {
        //                 this.messageService.add({severity: 'info', summary: 'info', detail: 'Désaffectation réussie', life: 3000});
        //             },
        //             (error) => {
        //                 this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Désaffectation non réussie', life: 3000});
        //             }
        //         );
        //     } else {
        //         console.log("Rôle non trouvé dans la cible.");
        //     }
        // }


        // addRoleToTarget(event) {
        //     // Récupérer l'élément déplacé vers la liste cible
        //     const selectedItem = event.items[0];
        //
        //     // Ajouter le rôle à la liste targetroless
        //     this.targetroless.push(selectedItem);
        //     console.log(  this.targetroless)
        //     console.log(selectedItem)
        //     console.log("Rôle ajouté avec succès à la cible !");

            // Appeler le service pour ajouter le rôle à l'utilisateur sélectionné
            // this.userService.AddRoleToUser(selectedItem).subscribe(
            //     (data) => {
            //         this.messageService.add({severity: 'info', summary: 'info', detail: 'Affectation réussie', life: 3000});
            //     },
            //     (error) => {
            //         this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Affectation non réussie', life: 3000});
            //     }
            // );
        //}

    }
