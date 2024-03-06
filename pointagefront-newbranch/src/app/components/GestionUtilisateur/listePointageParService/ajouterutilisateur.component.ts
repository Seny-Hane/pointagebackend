import { Component, OnInit } from '@angular/core';
import {PointageService} from "../../../service/pointage.service";
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DatePipe} from "@angular/common";
import {Pointage} from "../../../models/pointage.model";

@Component({
  selector: 'app-ajouterutilisateur',
  templateUrl: './ajouterutilisateur.component.html',
  styleUrls: ['./ajouterutilisateur.component.scss']
})
export class AjouterutilisateurComponent implements OnInit {
    submitted: boolean;
    date1: Date;
    date2: Date;
    tourner:boolean;
    erreur:boolean;
    users:any;
    username:any;
    user : any;
    d1: string;
    d2: string;
    result : any;
    selectedPointages: Pointage[];
  constructor(private pointageService: PointageService,public keycloak: KeycloakService,
              private http: HttpClient, private datepipe: DatePipe) {
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

    })
}


ngOnInit(): void {
  }



    rechercheByService(date1: Date, date2: Date) {
      this.submitted=true
        this.d1 = this.datepipe.transform(this.date1, 'dd-MM-yyyy');
        this.d2 = this.datepipe.transform(this.date2, 'dd-MM-yyyy');
        console.log(this.d1,this.d2)

        if (this.d1 && this.d2){


          console.log( this.user );
          this.pointageService.getListPointageByService(this.d1,this.d2,this.user.service.codeservice).subscribe((data)=>{
              this.result=data
              this.tourner=false;
              console.log(this.result)
              return data;

          })

        }


    }

    exportAsXLSX(result: any) {

    }

    exportPDF(result: any) {

    }
}
