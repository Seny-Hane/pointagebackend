import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PointageService} from "../../../service/pointage.service";
import {Pointage} from "../../../models/pointage.model";
import {AgentService} from "../../../service/agent.service";
import {Agent} from "../../../models/agent.model";
import {ConfirmationService, MessageService} from 'primeng/api';
import {DatePipe} from "@angular/common";
import {Subject} from "rxjs";
import {UserService} from "../../../service/user.service";
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {MotifService} from "../../../service/motif.service";


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
    pointage: Pointage = new Pointage();
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
    user : any;
    users:any;
    username:any;
    PointageDialog:boolean=false;
    ajoutProductDialog: boolean=false;




    constructor(private fb : FormBuilder,
              private router: Router,
              private http: HttpClient,
              private pointageService : PointageService,
              private agentService : AgentService,
              private messageService: MessageService,
              private route : ActivatedRoute,
              private userService: UserService,
              public keycloak: KeycloakService,
              private pointageservice: PointageService,
              private motifservice: MotifService,
              // private route : ActivatedRoute,

              public datepipe: DatePipe) {
      this.keycloak.loadUserProfile().then( res =>
      {
          // console.log(res);
          this.users = res;
          this.username= res.email;
           console.log(this.username);
          this.getUser(this.username);
      });
  }
    public getUser(email){
        // console.log(username);
        return  this.http.get(environment.apiUrl +'/user/emails/'+email).subscribe(data =>
        {
            this.user=data;
            console.log( this.user );
        })
    }

  ngOnInit(): void {


      this.pointageService.getHeureServeur().subscribe(data => {
          this.currentTime = data;
          console.log(this.currentTime)
           console.log(this.dateVendredi.getDay())
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

    FormControlPointage = this.fb.group({
        matricule: [null, [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(7)
        ]],
        datepointage: [null, Validators.required],
        heurearrivee: [null, Validators.required],
        heuredescente: [null],
        cumulheure: [null],

    });


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


    keyPressAlphaNumericWithCharacters(event: KeyboardEvent) {
        var inp = String.fromCharCode(event.keyCode);
        // Allow numbers, alphabets, space, underscore
        if (/[a-z0-9]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }


    hideDialog() {
        this.agentDialog = false;
        this.submitted = false;
    }
    hideDialog1() {
        this.PointageDialog=false
        this.ajoutProductDialog=false
    }


    savePointageMatin(agent) {
        console.log(agent)
        agent.service.drp=null;
        console.log( agent.service.drp)
        console.log(this.user)
            agent.service.typeService=null;
            agent.service.codeservice = this.user?.service?.codeservice
            console.log(agent)
        const codeServic = agent.service.codeservice
        this.pointageService.controlePointage(this.mat).subscribe(data =>{
           if(data == false){
               console.log(data)
                this.hideDialog();
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: this.agent.prenomagent+' '+this.agent.nomagent+' a déjà pointé ce matin. ', life: 8000});
            }else if (data == true){
                this.agentService.addPointageEntree(this.mat,codeServic).subscribe(data => {
                        this.hideDialog();
                        this.mot = this.currentDate.transform(this.heureDate, 'HH:mm');
                        this.messageService.add({severity: 'success', summary: 'Succes', detail: this.agent.prenomagent+' '+this.agent.nomagent+' a pointé avec succés. ', life: 8000});
                        this.pointageSubject.next();
                        this.mat=undefined;
                        //location.reload()
                        this.ngOnInit()
                    },
                    error => {
                        console.log(error)
                        this.ngOnInit()
                    })
           }
            console.log(data)
        }, error => {
            console.log(error)
        })

        //this.ngOnInit()

    }

    savePointageSoir(agent) {
        console.log(agent.service.codeservice)
        console.log(this.user.service.codeservice)
        agent.service.codeservice = this.user.service.codeservice
        console.log(agent)

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

    // PointageNow(pointage) {
    //     this.PointageDialog=false
    //    this.ajoutProductDialog=false
    //     console.log(pointage)
    //     const matricule = this.FormControlPointage.get('matricule').value;
    //     const heureArriveeValue = this.FormControlPointage.get('heurearrivee').value;
    //     const heureDescentValue = this.FormControlPointage.get('heuredescente').value;
    //     const datePointage = this.FormControlPointage.get('datepointage').value;
    //     console.log(heureArriveeValue)
    //     // Récupérer l'agent par son matricule
    //     this.agentService.getAgentByMatricule(matricule).subscribe(agentData => {
    //         const [hours, minutes] = heureArriveeValue.split(':').map(Number);
    //         const selectedDate = new Date();
    //         selectedDate.setHours(hours);
    //         selectedDate.setMinutes(minutes);
    //         console.log(selectedDate)
    //         const [heuredescent, minutesdescent] = heureDescentValue.split(':').map(Number);
    //         const selectedDateDescente = new Date();
    //         selectedDateDescente.setHours(heuredescent);
    //         selectedDateDescente.setMinutes(minutesdescent);
    //         console.log(selectedDateDescente)
    //
    //         // Assurer que l'agent a été récupéré avec succès
    //         if (!agentData) {
    //             this.messageService.add({
    //                 severity: 'error',
    //                 summary: 'Erreur',
    //                 detail: 'Agent introuvable pour le matricule fourni.',
    //                 life: 3000
    //             });
    //             return;
    //         }
    //
    //         // Assigner les données d'agent et d'heure d'arrivée
    //         let pointageTest = new  Pointage()
    //         pointageTest.agent = agentData;
    //         pointageTest.heurearrivee = selectedDate;
    //         //pointageTest.cumulheure=
    //         pointageTest.heuredescente=selectedDateDescente
    //         pointageTest.datepointage=datePointage
    //         console.log(pointageTest)
    //         // console.log(selectedDate)
    //
    //
    //         const codeService = this.user?.service?.codeservice; // Récupérer le code de service de l'utilisateur
    //         if (!codeService) {
    //             this.messageService.add({
    //                 severity: 'error',
    //                 summary: 'Erreur',
    //                 detail: 'Le code de service est introuvable.',
    //                 life: 3000
    //             });
    //             return;
    //         }
    //
    //         // Contrôler le pointage de l'agent
    //         console.log(matricule)
    //         this.pointageService.controlePointage(matricule).subscribe(pointageExists => {
    //             if (!pointageExists) {
    //                 this.messageService.add({
    //                     severity: 'error',
    //                     summary: 'Erreur',
    //                     detail: `${agentData.prenomagent} ${agentData.nomagent} a déjà pointé ce matin.`,
    //                     life: 8000
    //                 });
    //             } else {
    //                 // Ajouter le pointage
    //                 this.pointageservice.addPointage(matricule, codeService,pointageTest).subscribe(
    //                     () => {
    //                         this.messageService.add({
    //                             severity: 'success',
    //                             summary: 'Succès',
    //                             detail: 'Pointage ajouté avec succès',
    //                             life: 3000
    //                         });
    //                         this.FormControlPointage.reset();
    //                     },
    //                     error => {
    //                         console.log(error);
    //                         let errorMessage = 'Une erreur est survenue lors de l\'enregistrement du pointage';
    //                         if (error.error && error.error.message) {
    //                             errorMessage = error.error.message;
    //                         }
    //                         this.messageService.add({
    //                             severity: 'error',
    //                             summary: 'Erreur',
    //                             detail: errorMessage,
    //                             life: 3000
    //                         });
    //                     }
    //                 );
    //             }
    //         });
    //     }, error => {
    //         console.log(error);
    //         this.messageService.add({
    //             severity: 'error',
    //             summary: 'Erreur',
    //             detail: 'Une erreur est survenue lors de la récupération de l\'agent.',
    //             life: 3000
    //         });
    //     });
    // }
    //
    PointageNow(pointage) {

        console.log(pointage);

        const matricule = this.FormControlPointage.get('matricule')?.value;
        const heureArriveeValue = this.FormControlPointage.get('heurearrivee')?.value;
        const heureDescentValue = this.FormControlPointage.get('heuredescente')?.value;
        const datePointage = this.FormControlPointage.get('datepointage')?.value;

        console.log(heureArriveeValue);

        if (!matricule || !heureArriveeValue || !datePointage) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Tous les champs sont requis.',
                life: 3000
            });
            return;
        }

        this.agentService.getAgentByMatricule(matricule).subscribe(agentData => {
            const [hours, minutes] = heureArriveeValue.split(':').map(Number);
            const selectedDate = new Date();
            selectedDate.setHours(hours);
            selectedDate.setMinutes(minutes);
            console.log(selectedDate);

            let selectedDateDescente: Date | undefined = undefined;
            if (heureDescentValue) {
                const [heureDescent, minutesDescent] = heureDescentValue.split(':').map(Number);
                selectedDateDescente = new Date();
                selectedDateDescente.setHours(heureDescent);
                selectedDateDescente.setMinutes(minutesDescent);
                console.log(selectedDateDescente);
            }
            const codeService = this.user?.service?.codeservice; // Récupérer le code de service de l'utilisateur

            if (!agentData) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Agent introuvable pour le matricule fourni.',
                    life: 3000
                });
                return;
            }

            let pointageTest = new Pointage();
            pointageTest.agent = agentData;
            pointageTest.heurearrivee = selectedDate;
            pointageTest.datepointage = datePointage;
            if (selectedDateDescente) {
                pointageTest.heuredescente = selectedDateDescente;
            }

            console.log(pointageTest);
            console.log(matricule);
            this.pointageService.controlePointage(matricule).subscribe(pointageExists => {
                if (!pointageExists) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: `${agentData.prenomagent} ${agentData.nomagent} a déjà pointé ce matin.`,
                        life: 8000
                    });
                } else {
                    // Ajouter le pointage
                    this.pointageservice.addPointage(matricule, codeService,pointageTest).subscribe(
                        () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Pointage ajouté avec succès',
                                life: 3000
                            });

                        },
                        error => {
                            console.log(error);
                            let errorMessage = 'Une erreur est survenue lors de l\'enregistrement du pointage';
                            if (error.error && error.error.message) {
                                errorMessage = error.error.message;
                            }
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erreur',
                                detail: errorMessage,
                                life: 3000
                            });
                        }
                    );
                }
            });
        }, error => {
            console.log(error);
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Une erreur est survenue lors de la récupération de l\'agent.',
                life: 3000
            });
        });
        this.FormControlPointage.reset();
        this.ngOnInit()
        this.PointageDialog = false;
        this.ajoutProductDialog = false;


    }



    confirmPointage() {
        this.ajoutProductDialog=true


    }

    openForm() {
        this.PointageDialog=true

    }
}
