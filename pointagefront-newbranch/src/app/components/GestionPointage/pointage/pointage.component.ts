import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PointageService} from "../../../service/pointage.service";
import {Pointage} from "../../../models/pointage.model";
import {AgentService} from "../../../service/agent.service";
import {Agent} from "../../../models/agent.model";
import { ConfirmationService, MessageService } from 'primeng/api';
import {DatePipe} from "@angular/common";
import {Subject} from "rxjs";



@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
    providers: [MessageService, ConfirmationService],
  styleUrls: ['./pointage.component.scss']
})
export class PointageComponent implements OnInit {

    pointageForm! : FormGroup;
    Pointage! : Pointage;
    agent: Agent;
    pointage: Pointage;
    pointageSubject= new Subject<void>();
    agentDialog: boolean;
    submitted: boolean;
    id : string;
    currentAgent = new Agent();
    currentTime : any;
    buttonDisabled : boolean;
    currentDate = new DatePipe('en-US');
    heureDate = new Date();
    tabpointage : Pointage[];
    mot: string;
    mat: string;
    focus : any;
    dateVendredi = new Date();



  constructor(private fb : FormBuilder,
              private router: Router,
              private pointageService : PointageService,
              private agentService : AgentService,
              private messageService: MessageService,
              private route : ActivatedRoute,) { }

  ngOnInit(): void {


      this.pointageService.getHeureServeur().subscribe(data => {
          this.currentTime = data;
          // console.log(this.currentTime)
          // console.log(this.dateVendredi.getDay())
          if(this.dateVendredi.getDay() == 5) {
              this.buttonDisabled = this.currentTime > 5 && this.currentTime < 13;
          }else {
              this.buttonDisabled = this.currentTime > 5 && this.currentTime < 14;
          }
          //console.log(this.buttonDisabled)

      })

      //this.buttonDisabled = this.currentTime.getHours() > 5 && this.currentTime.getHours() < 13;

      this.pointageForm = this.fb.group({
          matricule : [null, Validators.required],
      })

      this.mat = "";

      this.pointageSubject.subscribe
      ( (data)=>
          {
              this.pointageService.getAllPointage();
          }
      )

  }

    // focus1() {
    //     document.getElementById('matriculeA').focus()
    //     console.log('bonjour')
    // }


    handleAddPointage() {
        this.submitted = true;
        if(this.mat.trim()){
            this.agentService.getAgentByMatricule(this.mat).subscribe(data => {
                    this.agent = data;
                    // console.log(this.agent)
                    if (this.agent == null){
                        // console.log("Damn")
                        this.agentDialog = false;
                        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Matricule Introuvable', life: 8000});
                    }
                    else {
                        this.submitted = false;
                        this.agentDialog = true;
                    }
                })
        }
  }


        // let matricule = this.pointageForm.value.matricule;
        // this.agentService.addPointageEntree(matricule).subscribe(data => {
        //     alert('Pointage Enregistré')
        // },
        //     error => {
        //     console.log(error)
        //     })

    // handleAddPointagesortie() {
    //     let matricule = this.pointageForm.value.matricule;
    //     this.agentService.addPointageSortie(matricule).subscribe(data => {
    //         alert('pointage enregistré avec succés')
    //     },
    //         error => {
    //         console.log(error)
    //         })
    // }


    hideDialog() {
        this.agentDialog = false;
        this.submitted = false;
    }


    savePointageMatin() {

        this.pointageService.controlePointage(this.mat).subscribe(data =>{
            if(data == false){
                this.hideDialog();
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: this.agent.prenomagent+' '+this.agent.nomagent+' a déjà pointé ce matin. ', life: 8000});
            }else if (data == true){
                this.agentService.addPointageEntree(this.mat).subscribe(data => {

                        this.hideDialog();
                        // this.mot = this.currentDate.transform(this.heureDate, 'HH:mm');
                        this.messageService.add({severity: 'success', summary: 'Succes', detail: this.agent.prenomagent+' '+this.agent.nomagent+' a pointé avec succés. ', life: 8000});
                        this.pointageSubject.next();
                        this.mat=undefined;
                        //location.reload()
                    },
                    error => {
                        console.log(error)
                    })
            }
            // console.log(data)
        }, error => {
            console.log(error)
        })

    }

    savePointageSoir() {

        this.pointageService.controlePointage(this.mat).subscribe(data =>{
            if(data == true){
                this.hideDialog();
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: this.agent.prenomagent+' '+this.agent.nomagent+" n'a pas pointé ce matin. ", life: 8000});
            }else if (data == false){
                this.pointageService.controlePointageSoir(this.mat).subscribe(data => {
                    if (data == false){
                        this.hideDialog();
                        this.messageService.add({severity: 'error', summary: 'Erreur', detail: this.agent.prenomagent+' '+this.agent.nomagent+" a déjà pointé ce soir. ", life: 8000});
                    }
                    else if(data == true){
                        this.agentService.addPointageSortie(this.mat).subscribe(data => {

                                this.hideDialog();
                                // this.mot = this.currentDate.transform(this.heureDate, 'HH:mm');
                                this.messageService.add({severity: 'success', summary: 'Succes', detail: this.agent.prenomagent+' '+this.agent.nomagent+' a pointé avec succés. ', life: 8000});
                                this.pointageSubject.next();
                                this.mat=undefined;
                            },
                            error => {
                                console.log(error)
                            })
                    }
                }, error => {
                    console.log(error)
                })
                // this.agentService.addPointageSortie(this.mat).subscribe(data => {
                //
                //         this.hideDialog();
                //         // this.mot = this.currentDate.transform(this.heureDate, 'HH:mm');
                //         this.messageService.add({severity: 'success', summary: 'Succes', detail: this.agent.prenomagent+' '+this.agent.nomagent+' a pointé avec succés. ', life: 8000});
                //         this.mat=undefined;
                //     },
                //     error => {
                //         console.log(error)
                //     })
            }
        },error => {
            console.log(error)
        })

    }

}
