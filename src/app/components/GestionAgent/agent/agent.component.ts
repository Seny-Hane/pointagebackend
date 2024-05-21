import { Component, OnInit } from '@angular/core';
import {Agent} from "../../../models/agent.model";
import {AgentService} from "../../../service/agent.service";
import {ActivatedRoute, Route, Router, Routes} from "@angular/router";
import {Service} from "../../../models/service.model";
import {ServicesService} from "../../../service/services.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ConfirmationService, Header, MessageService } from 'primeng/api';
import * as xlsx from 'xlsx';
import {Fichier} from "../../../models/fichier.model";
import {DatePipe} from "@angular/common";
import {Subject} from "rxjs";
import {Users} from "../../../models/users";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {StatutAgent} from "../../../models/statutAgent";
import { ExcelService } from 'src/app/service/excel.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
    providers: [MessageService, ConfirmationService],
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

    agents! : Agent[];
    agent : Agent;
    agentForm! : FormGroup;
    cols: any;
    selectedAgents: Agent[];
    agentDialog: boolean;
    modifagentDialog: boolean;
    submitted: boolean;
    statuses: any[];
    deleteAgentDialog: boolean = false;
    deleteAgentsDialog: boolean = false;
    rowsPerPageOptions = [5, 10, 20];
    services: any[];
    statutAgent: any[];
    id : number;
    currentService : any;
    currentSatut : StatutAgent;

    genrefilter:any;
    genre : any[];
    genree : any;
    filteredServices: any;
    datet:any;

    truc: string;
    truc1: string;
    truc2: string;

    AgentSubject = new Subject<void>();

    StatutAgent = new Subject<void>();

    ws: any[];
    wb: xlsx.WorkBook;
    charger:boolean;
    charger2:boolean;
    fichierChoisi : Fichier = new Fichier();
    nameFichier:any;

    importDialog: boolean;
    ImportTabDialog: boolean;
    contenutab: any[];
    pipe = new DatePipe('en-US');
    date1 : Date;
    date2 : Date;
    date3 : Date;

    mat: string;
    agentstatutDialog: boolean;
    tab = [];
    json= {reference:null,matricule : null, prenom: null,
         nom : null,sexe:null, service: null,daterecrutement:null};

  constructor(public agentService : AgentService,
              public fb : FormBuilder,
              public service : ServicesService,
              public router : Router,
              private messageService: MessageService,
              private route : ActivatedRoute,
              private confirmationService: ConfirmationService,public excelService: ExcelService,
              private http : HttpClient) {
  }

  ngOnInit(): void {

      // this.agentForm = this.fb.group({
      //     matricule : [null , Validators.maxLength(6)],
      //     prenomagent : [null, Validators.required],
      //     nomagent: [null, Validators.required],
      //     datenaissance : [null, Validators.required],
      //     daterecrutement : [null, Validators.required],
      //     email : [null, Validators.email],
      //     genre : [null, Validators.required],
      //     telephone : [null, Validators.minLength(9)],
      //     service : [null],
      //
      // });

      // this.genre = [
      //     {label: 'Masculin', value: 'M'},
      //     {label: 'Feminin', value: 'F'}
      // ];

      this.id = this.route.snapshot.params.id;

      this.service.getServiceByCodeService(this.id).subscribe(data => {
          this.currentService = data;
      });
      this.AgentSubject.subscribe
      ( (data)=>
          {
              this.getAllAgent();
          }
      )
      this.getAllAgent();

    //  this.getAllService()

      this.StatutAgent.subscribe(
          (data)=>{
              this.getAllStatutAgent()

      }
      )
      this.getAllStatutAgent()
      this.cols = [
        {field:'reference',Header:'reference'},
        {field:'matricule',Header:'matricule'},
          {field: 'prenom', header: 'prenom'},
          {field: 'nom', header: 'nom'},
          {field:'sexe',Header:'sexe'},
          {field: 'service', header: 'service'},
          {field:'daterecrutement',Header:'daterecrutement'}
      ];

  }

    handleNewAgent() {
        this.agent = {service: null};
        this.submitted = false;
        this.agentDialog = true;
       // this.modifagentDialog= true;

    }
    exportAsXLSX(agents){
        this.tab=[];
        console.log(this.agents)
        for(let i = 0; i < agents.length; i++){

           this.json.reference=this.agents[i].reference
              this.json.matricule=this.agents[i].matricule,
             this.json.prenom=this.agents[i].prenomagent,
              this.json.nom = this.agents[i].nomagent,
             this.json.sexe=this.agents[i].genre,
              this.json.service=this.agents[i].service.nomservice,
              this.json.daterecrutement=this.agents[i].daterecrutement

             this.tab.push({...this.json})
           
            
        }
        this.excelService.exportAsExcelFile(this.tab);
    }
    exportTableToPDF(agents){
        this.tab=[];
        console.log(this.agents)

        for (let i = 0; i < agents.length; i++) {
         const tb={
            reference:this.agents[i].reference,
            matricule:this.agents[i].matricule,
           prenom:this.agents[i].prenomagent,
           nom:this.agents[i].nomagent,
           genre:this.agents[i].genre,
           service:this.agents[i].service.nomservice,
           daterecrutement:this.agents[i].daterecrutement

         
          
          
    
          
         } ;
         this.tab.push(tb);
        }
        console.log(this.tab);
        const columns = this.cols?.map(col => col.field);
            const data = this.tab?.map(row => columns?.map(col => row[col]));
            console.log(data);

            const doc = new jsPDF();

            const texte="Liste employés"+(this.currentService? this.currentService.nomservice:"");
            doc.text(texte, 90, 20);

            const logoImg = new Image();
            logoImg.src = 'assets/layout/images/logoPoste.png';
            doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);

            autoTable(doc, {
                head: [columns],
                body: data,
                startY: 30,
            });
            doc.save((this.currentService ? this.currentService.nomservice : "") + 'Liste employés.pdf');

    }
    handleEditAgent(agent: Agent) {
        this.agent = {...agent};
         console.log(this.agent)
        this.date1 = new Date(this.agent.daterecrutement);
        this.agent.daterecrutement= this.date1;
        this.date2 = new Date(this.agent.datenaissance);
        this.agent.datenaissance= this.date2;
        this.date3 = new Date(this.agent.premierjourtravail);
        this.agent.premierjourtravail= this.date3;
        this.currentService=this.agent.service
        this.currentSatut = this.agent.statutAgent
        this.agentDialog = true;

    }

    handleDeleteAgent(agent: Agent) {
        this.deleteAgentDialog = true;
        this.agent = {...agent};
    }

    // handleDeleteAgents() {
    //
    // }

    hideDialog() {
        this.agentDialog = false;
    //    this.modifagentDialog= false;
        this.submitted = false;
    }


    saveAgent(agent : Agent) {
        this.submitted = true;
         console.log(this.agent)
        // this.agent.genre=this.genree.value;
        this.agent.ccPpal=this.currentService.numeroservice;

        if(this.agent.datenaissance && this.agent.daterecrutement && this.agent.reference){
            this.truc=""+this.agent.datenaissance;
            this.truc2=""+this.agent.daterecrutement;
            this.truc1=""+this.agent.reference;

        }
        if (this.agent.matricule.trim() && this.truc1.trim() && this.agent.prenomagent.trim() && this.agent.nomagent.trim() && this.truc.trim() && this.truc2.trim() && this.currentService.nomservice.trim() && this.agent.genre.trim()) {
            if (this.agent.idagent) {
                agent.service = this.currentService;
                agent.statutAgent.idstatut = this.currentSatut.idstatut;
                agent.service.codeservice = this.currentService.codeservice;
                this.agentService.updateAgent(agent, this.agent.idagent).subscribe( data => {
                        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Agent mis à jour', life: 3000});
                        this.AgentSubject.next();
                        //location.reload()
                        console.log(data)
                    },
                    error =>{
                        console.log(error)
                    }

                )

            } else {
                agent.service = this.currentService;
                agent.service.codeservice = this.currentService.codeservice;
                // console.log(this.agent)
                this.agentService.addAgent(agent).subscribe(data => {
                    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Agent Ajouté', life: 3000});
                    // console.log(this.agent)
                    this.AgentSubject.next();
                })

            }
            this.agents = [...this.agents];
            this.agentDialog = false;
            this.agent = {service : null};
        }

      //   agent.service = this.currentService;
      //   agent.service.codeservice = this.currentService.codeservice;
      // this.agentService.addAgent(agent).subscribe(data => {
      //     alert('Agent enregistré avec succés !')
      //     this.hideDialog()
      //     location.reload()
      // }, error => {
      //     console.log(error)
      // })
    }

    confirmDelete() {
        this.deleteAgentDialog = false;
        this.agents = this.agents.filter(val => val.idagent !== this.agent.idagent);
        this.agentService.deleteAgent(this.agent.idagent).subscribe(()=>{
                location.reload()
            },
            error => {
                console.log(error)
            }
        )
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Agent supprimé', life: 3000});
        this.agent = {service: null};
    }

    confirmDeleteSelected() {

    }

    getAllAgent() {
        console.log("e")
        this.http.get<any>(environment.apiUrl+'/agent/allagent').subscribe(data => {
          this.agents = data;
              console.log(data)
              console.log(this.agents)
      },
          error => {
          console.log(error)
              console.log("e")
          })
    }

    getAllService() {
      this.service.getAllService().subscribe( data => {
          this.services = data;
              this.services.sort((a,b) => a.nomservice.localeCompare(b.nomservice));
      },
          error => {
          console.log(error)
          })
    }
    getAllStatutAgent() {
        this.service.getAllStatut().subscribe( data => {
                this.statutAgent = data;
                console.log(this.statutAgent)
               // this.services.sort((a,b) => a.nomservice.localeCompare(b.nomservice));
            },
            error => {
                console.log(error)
            })
    }

    filterItems(event) {
        let filtered : any[] = [];
        let query = event.query;
        for(let i = 0; i < this.genre.length; i++) {
            let item = this.genre[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }
        this.genrefilter = filtered;
    }
    filterItems2(event) {
        let filtered : any[] = [];
        let query = event.query;
        for(let i = 0; i < this.services.length; i++) {
            let item = this.services[i];
            if (item.nomservice.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }
        this.services = filtered;
    }

    filterItems3(event) {
        let filtered : any[] = [];
        let query = event.query;
        for(let i = 0; i < this.statutAgent.length; i++) {
            let item = this.statutAgent[i];
            if (item.description.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }
        this.statutAgent = filtered;
    }
    // getServiceByCodeservice(codeservice : number) {
    //   this.service.getServiceByCodeService(codeservice).subscribe(data => {
    //       this.currentService = data;
    //   },
    //       error => {
    //       console.log(error)
    //       })
    // }



    onUpload(event) {
        // for (let f=0;f<this.nameFichier.length;f++)
        // {
        // console.log()
        // console.log(event.target.files)

        const target: DataTransfer = <DataTransfer>(event.target);
        // console.log(target.files);

//verification existence fichier
        /*     if (this.comparaisonFichiers(target.files[0].name))
             {
                 console.log('Vous ne pouvez pas charger ce fichier car il a déja été chargé');

                 this.charger = false;
                 // break;
             }
             else
             {*/
        // console.log(target.files[0].name);
        this.fichierChoisi.nomfichier = target.files[0].name

        // console.log('Good');
        this.charger=true;
        this.charger2=true;
        // this.chargefichierService.uploadFile(event.target.files[0]).subscribe(data =>
        // {
        //     console.log(data);
        // })

        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            let bstr = e.target.result;
            this.wb = xlsx.read(bstr, {type: 'binary'});

            /* grab first sheet */
            this.wb.SheetNames.forEach(ele => {
                this.ws = xlsx.utils.sheet_to_json(this.wb.Sheets[ele], {
                    raw: false,
                    dateNF: "dd-mm-yyyy"
                })

                // console.log(this.wb.Sheets[ele]);
                // console.log(this.ws);
            });
            /* wire up file reader */
            for (let index = 0; index < this.ws.length; index++) {
                // console.log(this.ws.length)
                // console.log(index)

                this.ws[index];
                //   console.log(this.ws[index]);
                //  console.log(this.ws[index].date);
                //  console.log(this.ws[index].MontantCFA)
                //   console.log(this.montantGlobal)
                //   this.montantGlobal += this.ws[index].MontantCFA

            }
            // console.log(this.ws.length);
            //
            //
            // console.log(this.ws);
            this.contenutab=this.ws;
            for (let b = 0; b < this.contenutab.length; b++){
                this.agentService.getAgentByMatricule(this.contenutab[b].agent).subscribe(
                    (data)=>{
                        this.contenutab[b].agent=data;
                    }
                );
            }
        };
        reader.readAsBinaryString(target.files[0]);

        //   this.contenutab = this.contenutab.filter(use => use.date === this.utilisateur.dg_structure.dg_drp.id && (use.dg_typeStructure.libelle === "BUREAU" || use.dg_typeStructure.libelle === "ANNEXE"));
    }

    // searchService(event) {
    //     const filtered: Service[] = [];
    //     const query = event.query;
    //     for (let i = 0; i < this.services.length; i++) {
    //         const service = this.services[i];
    //         if (service.nomservice.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //             filtered.push(service);
    //         }
    //     }
    //
    //     this.filteredServices = filtered;
    //     console.log(this.filteredServices)
    // }


    handleImport() {
      this.agent = {service: null};
      this.submitted = false;
      this.importDialog = true;
    }

    Importer() {
        this.ImportTabDialog = true;
    }

    ImportAll() {
        if (this.contenutab.length>0) {
            for (let b = 0; b < this.contenutab.length; b++){
                this.agentService.addAgent(this.contenutab[b]).subscribe( data => {

                        // console.log(this.contenutab[b]);

                    },
                    (error)=>
                    {
                        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Importation non réussie', life: 3000});
                        // console.log(this.contenutab[b])
                    })
            }
        }
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Importation réussie', life: 3000});
        this.ImportTabDialog = false;
        this.agent = {service: undefined};
        this.submitted = false;


    }

    hideDialog2() {
        this.importDialog = false;
        this.submitted = false;
    }

    hideDialog3() {
        this.ImportTabDialog = false;
        this.submitted = false;
    }

    hideDialog4() {
        this.agentstatutDialog = false;
        this.submitted = false;
    }

    handleAddStatut(Agent) {
        this.agent = Agent;
        this.agentstatutDialog= true;
    }

}
