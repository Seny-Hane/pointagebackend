import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import {KeycloakService} from "keycloak-angular";
import {UserService} from "./service/user.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss'],
})
export class AppTopBarComponent {

    user : any;
    users:any;
    username:any;
    items: MenuItem[];

    constructor(public appMain: AppMainComponent,
                private userService: UserService,
                public keycloak: KeycloakService,
                private http:HttpClient) {
        this.keycloak.loadUserProfile().then( res =>
        {
            // console.log(res);
            this.users = res;
            this.username= res.username;
             console.log(res.username);
            this.getStructure(this.username);
        });
    }

    public getStructure(username){
        // console.log(username);
        return  this.http.get(environment.apiUrl +'/user/email/'+username).subscribe(data =>
        {

            this.user = data;
            console.log( this.user );
        })
    }

    public deconnexion()
    {
        //console.log("fggh");
        return this.keycloak.logout();
    }
}
