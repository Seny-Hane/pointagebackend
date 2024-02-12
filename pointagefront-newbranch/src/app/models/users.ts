<<<<<<< HEAD

import {Roles} from "./roles";
import { Service } from "./service.model";
=======
import {Fonctions} from "./fonctions";
import {Roles} from "./roles";
import {Service} from "./service";
>>>>>>> e053ead0f3ebaff1c7917f48ce7272af759ea0c4

export class Users {
    id?: number;
    reference?: string;
    nom?: string;
    prenom?: string;
    password?: string;
    email?: string;
    telephone?: string;
    matricule?: string;
<<<<<<< HEAD
    enable?:boolean;
    userRoles?: any;
    login?: string;
    roles?: Roles[];
    role?: Roles;
    service? : Service;
    

=======
    service?:any;
    role?:any;
    enable?:boolean;
>>>>>>> e053ead0f3ebaff1c7917f48ce7272af759ea0c4
}
