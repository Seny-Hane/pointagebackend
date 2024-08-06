import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-guide-utilisateur',
  templateUrl: './guide-utilisateur.component.html',
  styleUrls: ['./guide-utilisateur.component.scss']
})
export class GuideUtilisateurComponent implements OnInit {
    hasAccess: boolean;

  constructor(public keycloak: KeycloakService) { }

  ngOnInit(): void {
  }
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

    isRespPointage() {
        this.hasAccess = false
        if (this.keycloak.getUserRoles().includes("ROLE_AGENT")) {
            this.hasAccess = true

        }

        return this.hasAccess


    }

    isSuperviseur() {
        this.hasAccess = false
        if (this.keycloak.getUserRoles().includes("ROLE_SUPERVISEUR")) {
            this.hasAccess = true

        }

        return this.hasAccess


    }



}
