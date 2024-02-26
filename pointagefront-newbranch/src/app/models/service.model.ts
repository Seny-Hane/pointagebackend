import {TypeService} from "./typeService.model";
import {Drp} from "./drp";

export class Service {
    codeservice?: number;
    datecreation?: Date;
    codeips?:string;
    codepostal?:string;
    adresse?:string;
    email?:string;
    telephone?:number;
    numeroservice?: string;
    nomservice? : string;
    drp : Drp;
    typeService : TypeService;
}
