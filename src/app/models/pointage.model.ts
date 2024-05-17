import {Agent} from "./agent.model";
import {Motif} from "./motif.model";
import {Time} from "@angular/common";

export class Pointage {
    idpointage? : number;
    datepointage? : Date;
    heurearrivee? : Date;
    heuredescente? : Date;
    cumulheure? : string;
    agent ?: Agent;
    // motif : Motif;
    Statut_Presence?: Statut_Presence;
}

// Définition de l'enum Statut_Presence
export enum Statut_Presence {
    PRESENT = "PRESENT"
}
