import {Service} from "./service.model";
import {StatutAgent} from "./statutAgent";

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
    statutAgent?: StatutAgent;
    service? : Service;

}
