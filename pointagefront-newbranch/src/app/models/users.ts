
import {Roles} from "./roles";
import { Service } from "./service.model";

export interface Users {
    id?: number;
    reference?: string;
    nom?: string;
    prenom?: string;
    password?: string;
    email?: string;
    telephone?: string;
    matricule?: string;
    enable?:boolean;
    userRoles?: any;
    login?: string;
    roles?: Roles[];
    role?: Roles;
    service? : Service;
    

}
