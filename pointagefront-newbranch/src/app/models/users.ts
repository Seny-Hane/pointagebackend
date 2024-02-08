import {Fonctions} from "./fonctions";
import {Roles} from "./roles";
import {Service} from "./service";

export class Users {
    id?: number;
    email?: string;
    nom?: string;
    password?: string;
    prenom?: string;
    reference?: string;
    telephone?: string;
    matricule?: string;
    service?:any;
    role?:any;
    enable?:boolean;
}
