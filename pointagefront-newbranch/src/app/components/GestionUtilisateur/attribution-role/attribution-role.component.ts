import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { ServicesService } from 'src/app/service/services.service';
import { Service } from 'src/models/service';
import {Drp} from "../../../models/drp";
import {Roles} from "../../../models/roles";
import {Fonctions} from "../../../models/fonctions";
import {UserService} from "../../../service/user.service";
import {environment} from "../../../../environments/environment";
import {Users} from "../../../models/users";
import {RoleService} from "../../../service/role.service";
import {ProductService} from "../../../service/productservice";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Product} from "../../../api/product";
import {Directions} from "../../../../models/directions";

@Component({
  selector: 'app-attribution-role',
  styleUrls: ['./attribution-role.component.scss'],
  templateUrl: './attribution-role.component.html',
})
export class AttributionRoleComponent implements OnInit {
    productDialog: boolean;
    productDialog2: boolean;
    productDialog3: boolean;
    structDialog: boolean;
    RolesDialog: boolean;
    FonctionDialog: boolean;

    cities: any[];


    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];


    product: Product;

    selectedProducts: Product[];


    // Drp


    directionsDialog: boolean;

    deletedirectionsDialog: boolean = false;

    deletedirectioonDialog: boolean = false;

    drps: Drp[];

    drp: Drp;

    selecteddirectioon: Drp[];

    directioon: Directions[];
    roles: Roles[];
    id:number;
    dg_fonction:Fonctions;
    fonction: Fonctions[];
    fonctions: Fonctions;
    fonctionsC: Fonctions;
    fonctionsP: Fonctions;
    filtereddirections: Directions[];
    filteredRole:Roles[];
    filteredroles:Directions[];
    directioon$!: Observable<Directions[]>;
   // historique: Modif;

    userSubject = new Subject<void>();
    fonctionSubject = new Subject<void>();
    roleSubject = new Subject<void>();
    user : Users[];
    usere : Users[];
    //utilisatreur: Users;
    utilisateur: any;
    rol: Roles[];
    roleSelect ?: string;
    usr:any[];
    user$!: Observable<Users[]>;

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];
    options = [];
    temp: string;

    listeServices:any[];

    roless:any[]=[]
    roleUser: Users
    serviceUser: Users


    constructor(private http: HttpClient,private productService: ProductService, private messageService: MessageService,
                private userService: UserService, private roleService : RoleService, private serviceServices: ServicesService) {
    }

    ngOnInit() {
        this.usere=[];


        this.productService.getProducts().then(data => this.products = data);


        this.userSubject.subscribe
        ( (data)=>
            {
                this.haveAllUser();
            }
        )
        this.haveAllUser();




        this.roleSubject.subscribe
        ( (data)=>
            {
                this.haveAllRoles();
            }
        )
        this.haveAllRoles();

        this.roleSubject.subscribe
        ( (data)=>
            {
                this.haveAllService();
            }
        )
        this.haveAllService();
    }

    // haveAllFonction() {
    //     this.organisationService.getAllFonctions().subscribe (
    //
    //         (data:Users[])=>
    //         {
    //             this.fonction=data
    //         }
    //     )
    //
    // }
    haveAllRoles() {
        this.http.get<Roles[]>(environment.apiUrl+`/role`).subscribe (

            (data:Roles[])=>
            {
                this.rol=data
                console.log(this.rol)

            }
        )

    }
    haveAllUser() {
        this.userService.getAllUser().subscribe (

            (data:Users[])=>
            {
                this.user=data
                console.log(this.user)
            }
        )

    }

    haveAllService() {
        this.serviceServices.getAllService().subscribe (

            (data)=>
            {
                this.listeServices=data
                console.log(this.listeServices)
            }
        )

    }

    openNew() {
        this.utilisateur = {};
        this.submitted = false;
        this.productDialog = true;
    }
    openNewRole(){
      //  this.rol={}
        this.submitted = false;
        this.RolesDialog = true;
    }
    openNewF(){
        this.fonctions={}
        this.submitted = false;
        this.FonctionDialog = true;
    }
    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editUser(utilisateur: any) {
        console.log(this.utilisateur)
        this.utilisateur = {...utilisateur};
        this.serviceUser= utilisateur.service.nomservice
        this.roleUser = utilisateur.role.authority
        this.productDialog2 = true;
    }
    // editStru(utilisatreur: Users) {
    //     this.utilisateur = utilisatreur;
    //     this.utilisatreur = {...utilisatreur};
    //     this.structDialog = true;
    // }
    // deleteProduct(product: Product) {
    //     this.deleteProductDialog = true;
    //     this.product = {...product};
    // }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete(){
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.productDialog2= false;
        this.productDialog3= false;
        this.structDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;
       // this.users.enable= false;
         this.utilisateur.service =this.utilisateur.service.codeservice
        this.utilisateur.role=  this.utilisateur.role.id
        // this.utilisateur.id = this.utilisatreur.id
        // this.utilisateur.nom = this.utilisatreur.nom
        // this.utilisateur.prenom = this.utilisatreur.prenom
        // this.utilisateur.matricule = this.utilisatreur.matricule
        // this.utilisateur.email = this.utilisatreur.email
        // this.utilisateur.reference = this.utilisatreur.reference
        // this.utilisateur.telephone = this.utilisatreur.telephone


        //console.log(this.users)
        console.log(this.utilisateur)

        if (this.utilisateur.nom.trim()) {
            if (this.utilisateur.id) {
                this.http.put<Users>(environment.apiUrl+`/user/user1/${this.utilisateur.id}`, this.utilisateur).subscribe((data) => {
                        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Utilisateur modifié', life: 3000});
                        this.userSubject.next()
                    },
                    (error)=>
                    {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Utilisateur Non modifié', life: 3000});
                    })
            }
            else {
                this.http.post<any>(environment.apiUrl+`/user/user1`, this.utilisateur).subscribe((data) => {
                        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Utilisateur Créé', life: 3000});
                        this.userSubject.next()

                    },
                    (error)=>
                    {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Utilisateur Non Créé', life: 3000});
                    })
            }
            this.user = [...this.user];
            this.productDialog = false;
            this.productDialog2 = false;
            this.structDialog = false;
            this.utilisateur = {};
        }
    }
    // saveUserprime() {
    //     this.submitted = true;
    //     console.log('Diago')
    //     console.log(this.utilisateur)
    //     console.log(this.utilisatreur)
    //     console.log(environment.apiUrl+`/user1/${this.utilisatreur.service.id}/${this.utilisatreur.dg_fonction.id}/affectationUser`)
    //     this.http.put<Users>(environment.apiUrl+`/dg_User/${this.utilisatreur.dg_structure.id}/${this.utilisatreur.dg_fonction.id}/affectationUser`, this.utilisateur).subscribe(data =>{
    //             console.log('Before')
    //             console.log(this.utilisateur)
    //             console.log('After')
    //             console.log(this.utilisatreur)
    //             this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Fonction utilisateur modifié', life: 3000});
    //             this.userSubject.next();
    //         },
    //         (error)=>
    //         {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Fonction utilisateur Non modifié', life: 3000});
    //         })
    //     this.user = [...this.user];
    //     this.productDialog = false;
    //     this.productDialog2 = false;
    //     this.structDialog = false;
    //     this.utilisatreur = {};
    //
    // }
    saveRole() {
        console.log(this.rol)
        this.http.post<Roles>(environment.apiUrl+'/role', this.rol).subscribe(data => {
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Role Créé', life: 3000});
                this.roleSubject.next();
            },
            (error)=>
            {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Role Non créé', life: 3000});
            })
    }
    // UpdateRole(rol: Roles){
    //     this.Clonesrol=this.rol;
    //     this.rol = {...rol};
    // }
    // UpdateRoleSave(rol: Roles){
    //     if(this.rol){
    //         this.rol = {...rol};
    //         console.log(this.rol)
    //         this.http.put<Roles>(environment.apiUrl+`/dg_Role/${this.rol.id}`, this.rol).subscribe((data) =>{
    //                 this.messageService.add({severity:'success', summary: 'Success', detail:'Le role a été mis à jour'})
    //                 this.roleSubject.next();
    //             },
    //             (error)=>
    //             {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Role Non modifié', life: 3000});
    //             })
    //     }
    //     else{
    //         this.messageService.add({severity:'error', summary: 'Error', detail:'Role invalide'});
    //     }
    // }
    // Cancel(rol: Roles){
    //     this.rol= {...rol};
    //     this.rol=this.Clonesrol;
    // }
    // saveFonction(){
    //     this.http.post<Fonctions>(environment.apiUrl+'/dg_Fonction', this.fonctions).subscribe(data => {
    //             this.messageService.add({severity: 'success', summary: 'Successful', detail: 'La Fonction Créé', life: 3000});
    //             this.fonctionSubject.next();
    //         },
    //         (error)=>
    //         {this.messageService.add({severity: 'error', summary: 'Echec', detail: 'La fonction n\'a pas été créée', life: 3000});
    //         })
    // }

    // saveUsers(){
    //     this.userService.saveUser().subscribe(data => {
    //             this.messageService.add({severity: 'success', summary: 'Successful', detail: 'La Fonction Créé', life: 3000});
    //             this.fonctionSubject.next();
    //         },
    //         (error)=>
    //         {this.messageService.add({severity: 'error', summary: 'Echec', detail: 'La fonction n\'a pas été créée', life: 3000});
    //         })
    // }
    UpdateFonction(fonctions: Fonctions){
        this.fonctionsC=this.fonctions;
        this.fonctions = {...fonctions};
    }
    // UpdateFonctionSave(fonctions: Fonctions){
    //     if(this.fonctions){
    //         this.fonctions = {...fonctions};
    //         console.log(this.fonctions)
    //         this.http.put<Fonctions>(environment.apiUrl+`/dg_Fonction/${this.fonctions.id}`, this.fonctions).subscribe((data) =>{
    //                 this.messageService.add({severity:'success', summary: 'Success', detail:'La fonction a été mis à jour'})
    //                 this.fonctionSubject.next();
    //             },
    //             (error)=>
    //             {this.messageService.add({severity: 'error', summary: 'Echec', detail: 'La fonction n\'a pas été mis à jour', life: 3000});
    //             })
    //     }
    //     else{
    //         this.messageService.add({severity:'error', summary: 'Error', detail:'Fonction invalide'});
    //     }
    // }
    CancelF(fonctions: Fonctions){
        console.log(this.fonctionsP)
        console.log(this.fonction[this.fonctions.id])
        this.fonctions=this.fonctionsC;
    }
    // Historique(utilisatreur: Users){
    //     this.utilisatreur = utilisatreur;
    //     console.log(this.utilisatreur)
    //     this.productDialog3 = true;
    //     this.organisationService.getModifUser(this.utilisatreur.id).subscribe(
    //         (data)=>
    //         {
    //             this.historique=data;
    //             this.organisationService.User=this.historique;
    //             console.log(this.historique)
    //         },
    //         (error)=>
    //         {
    //             this.messageService.add({severity: 'error', summary: 'Echec', detail: 'Une erreur s\'est produit au niveau de l\'affichage', life: 3000});
    //         }
    //     )
    //     console.log(this.historique)
    //
    // }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    filterDirections(event) {
        const filtered: Service[] = [];
        const query = event.query;
        for (let i = 0; i < this.listeServices.length; i++) {
            const country = this.listeServices[i];
            if (country.nomservice.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filtereddirections = filtered;
        console.log(this.filtereddirections)
    }
    filterRoles(event) {
        const filtered: Roles[] = [];
        const query = event.query;
        for (let i = 0; i < this.rol.length; i++) {
            const country = this.rol[i];

                filtered.push(country);

        }

        this.filteredRole = filtered;
        console.log(this.filteredRole)
    }
  /*
    filterRoles(event) {
        const filtered: Roles[] = [];
        let userrole :any={};
        const query = event.query;
        for (let i = 0; i < this.roles.length; i++) {
            const role = this.roles[i];
            if (role.authority.toLowerCase().indexOf(query.toLowerCase()) == 0) {
               userrole.dg_role=role;
               userrole.dg_user=this.utilisatreur

                filtered.push(userrole)
            }
        }

        this.filteredroles=filtered

        console.log(this.filteredroles)
    }*/

    editStru(utilisateur: any) {

    }
}
