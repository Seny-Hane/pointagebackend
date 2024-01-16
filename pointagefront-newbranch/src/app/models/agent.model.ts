import {Service} from "./service.model";

export class Agent {
    idagent? : number;
    matricule? : string;
    reference? : number;
    datenaissance? : Date;
    daterecrutement? : Date;
    premierjourtravail? : Date;
    prenomagent? : string;
    nomagent? : string;
    ccPpal? : string;
    email? : string;
    telephone? : string;
    genre? : string;
    service? : Service;

}
