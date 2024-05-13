import { Component, OnInit } from '@angular/core';
import {AgentService} from "../../../service/agent.service";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Users} from "../../../models/users";
import {Product} from "../../../api/product";
import { Header } from 'primeng/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Service } from 'src/app/models/service.model';
import { ExcelService } from 'src/app/service/excel.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {
    users:any;
    username:any;
    user : any;
    listAgent:any;
    submitted: boolean;
    currentService: Service;
    cols: any[];
    selectedProducts: Product[];
    productDialog: boolean;
    tab = [];
    result:any;
    json= {reference:null,
            matricule : null,
           prenom: null,
           nom : null, 
           genre:null,
           daterecrutement:null,
            
           };

  constructor(private agentService:AgentService,
              public keycloak: KeycloakService,
              private http: HttpClient,
              public excelService: ExcelService,
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
       this.cols= [
        {field:'reference',Header:'reference'.trim()},
        {field: 'matricule', header: 'matricule'.trim()},
        {field: 'prenom', header: 'prenom'.trim()},
        {field: 'nom', header: 'nom'.trim()},
        {field:'genre',Header:'genre'.trim()},
        {field:'daterecrutement',Header:'daterecrutement'.trim()}
        
       ];
      
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
    exportAsXLSX(listAgent): void {
      this.tab = [];
      for (let i = 0; i < this.listAgent?.length; i++){
      const tb = {
        reference:this.listAgent[i].reference,
        matricule: this.listAgent[i].matricule,
        prenom:this.listAgent[i].prenomagent,
        nom:this.listAgent[i].nomagent,
        genre:this.listAgent[i].genre,
        daterecrutement:this.listAgent[i].daterecrutement,
      };
      this.tab.push(tb);
      }
      this.excelService.exportAsExcelFile(this.tab);
    }
    
    exportPDF(listAgent):void{
      this.tab = [];
      for (let i = 0; i < this.listAgent?.length; i++){
      const tb = {
        reference:this.listAgent[i].reference,
        matricule: this.listAgent[i].matricule,
        prenom:this.listAgent[i].prenomagent,
        nom:this.listAgent[i].nomagent,
        genre:this.listAgent[i].genre,
        daterecrutement:this.listAgent[i].daterecrutement,
      };
      this.tab.push(tb);
      }
      console.log(this.tab);
    
        const columns = this.cols?.map(col => col.field);
        const data = this.tab?.map(row => columns?.map(col => row[col]));
        console.log(data);
    
        const doc = new jsPDF();
    
        const texte = "liste agent:  " + (this.currentService ? this.currentService.nomservice : "");
        doc.text(texte, 40, 20);
    
        const logoImg = new Image();
        logoImg.src = 'assets/layout/images/logoPoste.png';
        doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);
    
        autoTable(doc, {
            head: [columns],
            body: data,
            startY: 30,
        });
        doc.save((this.currentService ? this.currentService.nomservice : "") + 'Liste agents.pdf');
    };


}
