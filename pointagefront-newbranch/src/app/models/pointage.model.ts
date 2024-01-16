import {Agent} from "./agent.model";
import {Motif} from "./motif.model";

export class Pointage {
    idpointage? : number;
    datepointage? : Date;
    heurearrivee? : Date;
    heuredescente? : Date;
    cumulheure? : string;
    agent : Agent;
    motif : Motif;
}
