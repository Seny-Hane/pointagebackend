import {Agent} from "./agent.model";
import {Motif} from "./motif.model";
import {Service} from "./service.model";

export class Absence {
    id?:number
    dateAbs? : Date;
    commentaire? : string;
    agent?: Agent;
    motif ?: Motif;
    service?: Service;

}
