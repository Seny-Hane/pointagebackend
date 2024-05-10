
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Roles } from 'src/app/models/roles';
import { Users } from 'src/app/models/users';

@Injectable({
    providedIn:'root'
})
export class Sauvegarde {

    UsersInformation: Users[];
    Users_Information: Users;


    RoleInformation: Roles[];
    Role_Information: Roles;

    /*
        Structure = {
           // StructureInformation= ,
            seatInformation: {
                class: null,
                wagon: null,
                seat: null
            },
            paymentInformation: {
                cardholderName:'',
                cardholderNumber:'',
                date:'',
                cvv:'',
                remember:false
            }
        };

        private paymentComplete = new Subject<any>();

        paymentComplete$ = this.paymentComplete.asObservable();
    */
    /*
        setStructureInformation(StructureInformation) {
           // this.StructureInformation = StructureInformation;
        }
    */
    complete() {
        this.Users_Information={};
        this.RoleInformation=[];
    }
}
