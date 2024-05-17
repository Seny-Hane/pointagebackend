
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Agent } from 'src/app/models/agent.model';
import { Motif } from 'src/app/models/motif.model';
import { Pointage } from 'src/app/models/pointage.model';
import { PointageService } from 'src/app/service/pointage.service';
import { MotifService } from 'src/app/service/motif.service';
import { AgentService } from 'src/app/service/agent.service';
import { UserService } from 'src/app/service/user.service';
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../../../environments/environment";
import { log } from 'console';

@Component({
  selector: 'app-rattrapage',
  templateUrl: './rattrapage.component.html',
  styleUrls: ['./rattrapage.component.scss']
})
export class RattrapageComponent implements OnInit {

  submitted: boolean;
  pointage: Pointage = new Pointage();
  addagent: Agent;
  addmotif: Motif;
  agentID: number;
  mtif: number;
  motifs: Motif[];
  filteredMotif: Motif[];
  matricule: string;
  user : any;
  users:any;
  username:any;
  http: any;
  agent: Agent;

  constructor(
    public router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
    private pointageservice: PointageService,
    private motifservice: MotifService,
    private agentService: AgentService,
    private userService: UserService,
    // private route : ActivatedRoute,
    public keycloak: KeycloakService,
    private pointageService : PointageService,
  ) {
    this.addagent= new Agent();

    this.keycloak.loadUserProfile().then( res =>
      {
           console.log(res);
          this.users = res;
          this.username= res.email;
           console.log(this.username);
          this.getUser(this.username);
      });
  }

  public getUser(email){
    return  this.userService.getUserByUsername(email).subscribe(data =>
    {
        this.user=data;
        console.log( this.user );
    })
}

  ngOnInit(): void {
    this.getMotif();
  }

  hide() {
    this.submitted = false;
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
    motif: [null, Validators.required],
  });

  
  // PointageNow() {
    
  //   this.addagent.idagent = this.agent;
  //   this.pointage.agent = JSON.parse(JSON.stringify(this.addagent));
  
  //   this.addmotif.idmotif = this.mtif;
  //   this.pointage.motif = JSON.parse(JSON.stringify(this.addmotif));
  
  //   this.pointage.agent.matricule = this.matricule;
  
  //   this.pointageservice.addPointage(this.pointage).subscribe(
  //     data => {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Succès',
  //         detail: 'Pointage ajouté avec succès',
  //         life: 3000
  //       });
  //       console.log(this.pointage);
  //       this.FormControlPointage.reset();
  //     },
  //     error => {
  //       console.log(error);
  //       let errorMessage = 'Une erreur est survenue lors de l\'enregistrement du pointage';
  //       if (error.error && error.error.message) {
  //         errorMessage = error.error.message;
  //       }
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Erreur',
  //         detail: errorMessage,
  //         life: 3000
  //       });
  //     }
  //   );
  // }
  // PointageNow() {
  //   // Récupérer l'identifiant de l'agent à partir du matricule
  //   this.agentService.getAgentByMatricule(this.matricule).subscribe(agent => {
  //     this.addagent.idagent = agent.idagent;
  //     this.pointage.agent = JSON.parse(JSON.stringify(this.addagent));

  //     this.pointage.agent.matricule = this.matricule;
  
  //     this.pointageservice.addPointage(this.pointage).subscribe(
  //       data => {
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Succès',
  //           detail: 'Pointage ajouté avec succès',
  //           life: 3000
  //         });
  //         console.log(this.pointage);
  //         this.FormControlPointage.reset();
  //       },
  //       error => {
  //         console.log(error);
  //         let errorMessage = 'Une erreur est survenue lors de l\'enregistrement du pointage';
  //         if (error.error && error.error.message) {
  //           errorMessage = error.error.message;
  //         }
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Erreur',
  //           detail: errorMessage,
  //           life: 3000
  //         });
  //       }
  //     );
  //   },
  //   error => {
  //     console.log(error);
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Erreur',
  //       detail: 'Une erreur est survenue lors de la récupération de l\'identifiant de l\'agent',
  //       life: 3000
  //     });
  //   });
  // }
  convertToDate(dateString: string, timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date(dateString);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
 PointageNow(pointage) {
    this.agentService.getAgentByMatricule(this.matricule).subscribe(agentData => {
        console.log(agentData);
        console.log(this.user);


        // Assigner l'agent et le matricule
        this.addagent.idagent = agentData?.idagent;
        this.pointage.agent = agentData;
        this.pointage.agent.matricule = this.matricule;
        console.log( this.FormControlPointage.get('heurearrivee').value)
       

        console.log(pointage);
        console.log(this.matricule);

        const codeService = this.user?.service?.codeservice; // Récupérer le code de service de l'utilisateur
        if (codeService == null) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Le code de service est introuvable.',
                life: 3000
            });
            return; // Sortir de la fonction si le code de service est introuvable
        }

        pointage.agent.service.codeservice = codeService;

        this.pointageService.controlePointage(this.matricule).subscribe(data => {
            if (data == false) {
                console.log(data);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: `${this.pointage.agent.prenomagent} ${this.pointage.agent.nomagent} a déjà pointé ce matin.`,
                    life: 8000
                });
            } else if (data == true) {
              console.log(pointage);
                console.log(this.user);
                // this.pointage.heurearrivee= this.FormControlPointage.get('heurearrivee').value;

                // Assigner les valeurs du formulaire à l'objet pointage
                const pointageFormValue = this.FormControlPointage.value;
                const datepointage = pointageFormValue.datepointage;
                this.pointage.heurearrivee = this.convertToDate(datepointage, pointageFormValue.heurearrivee);
                this.pointage.heuredescente = pointageFormValue.heuredescente ? this.convertToDate(datepointage, pointageFormValue.heuredescente) : null;

                this.pointageservice.addPointage(this.matricule, codeService).subscribe(
                    data => {
                      console.log(data);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Pointage ajouté avec succès',
                            life: 3000
                        });
                        this.FormControlPointage.reset();
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
}


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

  selectMotif(event: any) {
    const filtered: Motif[] = [];
    const query = event.query;
    for (let i = 0; i < this.motifs.length; i++) {
      const country = this.motifs[i];
      if (country.motif.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredMotif = filtered;
  }

  getMotif() {
    this.motifservice.getAllMotif().subscribe(motifs => {
      this.motifs = motifs;
    });
  }
}
