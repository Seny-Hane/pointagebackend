import { Component, OnInit } from '@angular/core';
import {AgentService} from "../../../service/agent.service";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Users} from "../../../models/users";
import {Product} from "../../../api/product";


@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {
    users:any;
    username:any;
    user : any;
    listAgent:any[];
    submitted: boolean;

    cols: any[];
    selectedProducts: Product[];
    productDialog: boolean;
    tab = [];
    result:any;
    json= {matricule : null, prenom: null, nom : null, email: null, telephone:null, reference:null};

  constructor(private agentService:AgentService, public keycloak: KeycloakService,
              private http: HttpClient,
              ) {

  }

    ngOnInit(): void {
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

    public getUserss(email){
        return  this.http.get(environment.apiUrl +'/user/emails/'+email).subscribe(data =>
        {
            this.user = data
            console.log( this.user );
            this.getListAgentByService()
        })
    }

  getListAgentByService(){
       console.log(this.user)
      this.agentService.getListAgentByService(this.user.service.codeservice).subscribe((data)=>{
          this.listAgent=data;
          console.log(this.listAgent)

      })

  }
    openNew() {
      //  this.utilisateur = {};
        this.submitted = false;
        this.productDialog = true;

    }

    


}
