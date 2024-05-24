import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import {KeycloakService} from "keycloak-angular";
import {SuperviseurComponent} from "./components/GestionPointage/superviseur/superviseur.component";
import {AuthGuard} from "./service/auth.guard";

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container"style="font-size:17px;">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)" style="color: black;">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" style="font-size:17px;" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {


    listRoles

    findRole(rolearray: Array<String>) {

        this.listRoles=this.keycloak.getKeycloakInstance().realmAccess.roles
        console.log(this.listRoles)
        let menut= false
        const length=rolearray.length-1

        // console.log(length)
        //
        // console.log(typeof this.listRoles)

        if (typeof this.listRoles==="object") {
            let taille= this.listRoles.length - 1
            for(let i=0; i<=length; i++) {
                for (let j=0; j<=taille; j++) {
//if(testlist.find(role=>role===rolearray[i])!=undefined){
                    if(this.listRoles[j]===rolearray[i]){
                        menut=true
                    }

                }
            }
        }
        else if(typeof this.listRoles!="object") {
            for(let i=0; i<=length; i++) {
                if(this.listRoles===rolearray[i]){
                    menut=true
                }
            }
        }
        return menut

    }

    model: any[];

    constructor(public appMain: AppMainComponent, public keycloak: KeycloakService) { }

    ngOnInit() {
        this.model = [
            // {
            //     label: 'Home',
            //     rootroles: this.findRole(['ROLE_DRH']),
            //     items:[
            //         {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/'], roles: this.findRole(['ROLE_DRH'])},
            //     ]
            // },

            //
            // {
            //     label: 'Gestion Utilisateur',
            //     rootroles: this.findRole(['ROLE_DRH']),
            //     items: [
            //
            //
            //         {label: 'Ajouter Utilisateur', icon: 'pi  pi-fw pi-user-plus',routerLink: ['gestion/attributionroles'],roles: this.findRole(['ROLE_DRH'])},
            //         {routerLink: ['gestion/role'],roles: this.findRole(['ROLE_DRH'])},
            //
            //     ]
            // },

            {
                label: 'Gestion Pointage',
                rootroles: this.findRole(['ROLE_DRH','ROLE_AGENT','ROLE_VIGILE','ROLE_SUPERVISEUR','ROLE_CHEFDESERVICE']),
                items: [
                    {label: 'Pointage', icon: 'pi pi-fw pi-pencil', routerLink: ['/gestion/pointage'], roles: this.findRole(['ROLE_AGENT','ROLE_DRH','ROLE_VIGILE'])},
                    {label: 'Liste des Présents', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/listpointage'], roles: this.findRole(['ROLE_DRH'])}, /*A commenter avant de deployer*/
                    {label: 'Supervision en temps réel', icon: 'pi pi-fw pi-history', routerLink: ['/gestion/supervisionpointage'], roles: this.findRole(['ROLE_DRH','ROLE_SUPERVISEUR'])},
                    {label: 'Rapport par Service', icon: 'pi pi-fw pi-id-card', routerLink: ['/rapport/rapportpointage'], roles: this.findRole(['ROLE_DRH','ROLE_SUPERVISEUR'])},
                    {label: 'Rapport De Présence', icon: 'pi pi-fw pi-id-card', routerLink: ['gestion/ListPointageByService'], roles: this.findRole(['ROLE_CHEFDESERVICE','ROLE_DRH'])},

                    // {label: 'Absences Journalières', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/absencejournaliere'], roles: this.findRole(['ROLE_DRH'],)},
                    {label: 'Liste Présence du service', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/superviseur'], roles: this.findRole(['ROLE_DRH','ROLE_CHEFDESERVICE'])},
                    //  {label: 'Rapport par Service', icon: 'pi pi-fw pi-id-card', routerLink: ['/rapport/raportpointage'], roles: this.findRole(['ROLE_SUPERVISEUR'])},
                /*    {label: 'Absences Journalières', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/absencjournaliere'], roles: this.findRole(['ROLE_CHEFDESERVICE'],)},
                    {label: 'Absences Périodiques', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/absenceperiodique'], roles: this.findRole(['ROLE_CHEFDESERVICE'],)},
                    {label: 'Absences Périodiques Par Service', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/absenceperiodiqueparservice'], roles: this.findRole(['ROLE_CHEFDESERVICE','ROLE_DRH'],)},*/

                ]
            },
            {
                label: 'Parametrage',
                rootroles: this.findRole(['ROLE_CHEFDESERVICE','ROLE_SUPERVISEUR','ROLE_DRH']),
                items: [
                    {label: 'Gestion Utilisateur', icon: 'pi  pi-fw pi-user-plus',routerLink: ['gestion/attributionroles'],roles: this.findRole(['ROLE_DRH'])},
                    {routerLink: ['gestion/role'],roles: this.findRole(['ROLE_DRH']),visible: false},
                    {label: 'Liste Agents du service', icon: 'pi  pi-fw pi-user-plus',routerLink: ['gestion/utilisateur'],roles: this.findRole(['ROLE_DRH','ROLE_CHEFDESERVICE'])},
                    {label: 'Liste des Services', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/servicesPoste'], roles: this.findRole(['ROLE_DRH','ROLE_SUPERVISEUR'],)},
                    {label: 'Liste Employés', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/agent'], roles: this.findRole(['ROLE_DRH','ROLE_SUPERVISEUR'])},
                    {label: 'Rattrapage', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/rattrapage'], roles: this.findRole(['ROLE_SUPERVISEUR','ROLE_DRH','ROLE_CHEFDESERVICE'])},

                ]

            },
            {
                label: 'Gestion Absences',
                rootroles: this.findRole(['ROLE_CHEFDESERVICE','ROLE_SUPERVISEUR','ROLE_DRH']),
                items: [
                 //   {label: 'Liste Retard Par Service', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/absencejournaliere'], roles: this.findRole(['ROLE_SUPERVISEUR'],)},
                    {label: 'Absence par Agent', icon: 'pi pi-fw pi-id-card', routerLink: ['gestion/ListAgentAbsByMatricule'], roles: this.findRole(['ROLE_DRH','ROLE_CHEFDESERVICE','ROLE_SUPERVISEUR'],)},
               //     {label: 'Périodiques Par Agent', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/absenceperiodique'], roles: this.findRole(['ROLE_CHEFDESERVICE','ROLE_SUPERVISEUR'],)},
                    {label: 'Périodiques Par Service', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/absenceperiodiqueparservice'], roles: this.findRole(['ROLE_DRH','ROLE_SUPERVISEUR'])},
                    {label: "Rapport d'Absence", icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/ListAgentAbsByService'], roles: this.findRole(['ROLE_CHEFDESERVICE','ROLE_DRH'])},
                    {label: "List Absence Globale ", icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/AllLiseAbs'], roles: this.findRole(['ROLE_CHEFDESERVICE','ROLE_DRH','ROLE_SUPERVISEUR'])},

                ]
            }
            /**
            {
                label: 'UI Components',
                items: [
                    {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
                    {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
                    {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel']},
                    {label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate']},
                    {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
                    {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
                    {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
                    {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
                    {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
                    {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
                    {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
                    {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true},
                    {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
                    {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
                    {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
                    {label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc']}
                ]
            },
            {
                label:'Prime Blocks',
                items:[
                    {label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW'},
                    {label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank'},
                ]
            },
            {label:'Utilities',
                items:[
                    {label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/icons']},
                    {label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank'},
                ]
            },
            {
                label: 'Pages',
                items: [
                    {label: 'Crud', icon: 'pi pi-fw pi-user-edit', routerLink: ['/pages/crud']},
                    {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline']},
                    {label: 'Landing', icon: 'pi pi-fw pi-globe', routerLink: ['pages/landing']},
                    {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['pages/login']},
                    {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['pages/error']},
                    {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['pages/notfound']},
                    {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['pages/access']},
                    {label: 'Empty', icon: 'pi pi-fw pi-circle', routerLink: ['/pages/empty']}
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label:'Get Started',
                items:[
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                    }
                ]
            }*/
        ];

        this.model=this.model.filter(x=>x.rootroles==true)

        for(let root of this.model) {
            root.items=root.items.filter(x=>x.roles==true)
        }

    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
