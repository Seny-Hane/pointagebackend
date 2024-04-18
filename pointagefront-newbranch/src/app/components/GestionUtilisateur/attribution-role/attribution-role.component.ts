import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { ServicesService } from 'src/app/service/services.service';
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
import {Service} from "../../../models/service";
import {ExcelService} from "../../../service/excel.service";
// import {Service} from "../../../models/service.model";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-attribution-role',
  templateUrl: './attribution-role.component.html',
  styleUrls: ['./attribution-role.component.scss']
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

    roles: Roles[];
    id:number;
    dg_fonction:Fonctions;
    fonction: Fonctions[];
    fonctions: Fonctions;
    fonctionsC: Fonctions;
    fonctionsP: Fonctions;

    filteredRole:Roles[];

   // historique: Modif;

    userSubject = new Subject<void>();
    fonctionSubject = new Subject<void>();
    roleSubject = new Subject<void>();
    user : Users[];
    usere : Users[];
    utilisatreur: Users;
    utilisateur: Users;

    rol: Roles[];
    rolle:Roles
    roleSelect ?: string;
    usr:any[];
    user$!: Observable<Users[]>;

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];
    options = [];
    temp: string;
    listeServices:Service[];

    roless:any[]=[]
    roleUser: Users
    serviceUser: Users
    utilisateurService: any;
     filtereddirections: any[];
    rolauthority
    roldescription
    rolees:Roles= new  Roles();
    Clonesrol:Roles;
    tab = [];
    results: any[];
    currentService: any;
    json= {nom : null, prenom: null, email: null, matricule: null, telephone: null, reference: null};


    constructor(private http: HttpClient,private productService: ProductService, private messageService: MessageService,
                private userService: UserService, private roleService : RoleService, private serviceServices: ServicesService,
                public excelService: ExcelService, ){}

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

        this.cols= [
            {field: 'nom', header: 'nom'},
            {field: 'prenom', header: 'prenom'},
            {field: 'email', header: 'email'},
            {field: 'matricule', header: 'matricule'},
            {field: 'telephone', header: 'telephone'},
            {field: 'reference', header: 'reference'},
            // {field: 'etat', header: 'etat'}
          ];
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

    editUser(utilisateur: Users) {
        console.log(utilisateur)

        this.utilisateur = {...utilisateur};
        this.utilisatreur=utilisateur
        this.utilisatreur.service.drp=null
        this.utilisatreur.service.typeService=null
        this.utilisatreur.service.email=null
        //this.utilisatreur.service.nomservice=null
        this.utilisatreur.service.numeroservice=null
        this.utilisatreur.service.telephone=null
        this.utilisatreur.service.adresse=null
        this.utilisatreur.service.codepostal=null
        this.utilisatreur.service.codeips=null
        this.utilisatreur.service.datecreation=null
        this.utilisatreur.service.numeroservice=null


        this.utilisateurService= this.utilisateur.service
        this.utilisateur.service = this.utilisatreur.service;
        this.utilisateur.enable = this.utilisatreur.enable;
        this.utilisateur.nom = this.utilisatreur.nom
        this.utilisateur.prenom = this.utilisatreur.prenom
        this.utilisateur.matricule = this.utilisatreur.matricule
        this.utilisateur.email = this.utilisatreur.email
        this.utilisateur.reference = this.utilisatreur.reference
        this.utilisateur.telephone = this.utilisatreur.telephone


        this.productDialog2 = true;
        console.log(this.utilisateur)
        console.log(this.utilisatreur)

    }
    editStru(utilisateur:any) {
        console.log(utilisateur)
     //   this.utilisateur = utilisatreur;
        this.utilisateur = {...utilisateur};
        this.structDialog = true;
    }
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

    saveUser(utilisateur) {
        console.log(utilisateur)
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

        this.rolees.authority=this.rolauthority;
        this.rolees.description=this.roldescription;
        console.log(this.rolees)

        this.http.post<Roles>(environment.apiUrl+'/role', this.rolees).subscribe(data => {
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Role Créé', life: 3000});
                this.roleSubject.next();
            },
            (error)=>
            {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Role Non créé', life: 3000});
            })
        this.ngOnInit()
    }
    UpdateRole(rolle: Roles){
       this.Clonesrol=this.rolle;
        this.rolle = {...rolle};
    }
    UpdateRoleSave(rolle: Roles){
        if(this.rolle){
            this.rolle = {...rolle};
            console.log(this.rol)
            this.http.put<Roles>(environment.apiUrl+`/dg_Role/${this.rolle.id}`, this.rol).subscribe((data) =>{
                    this.messageService.add({severity:'success', summary: 'Success', detail:'Le role a été mis à jour'})
                    this.roleSubject.next();
                },
                (error)=>
                {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Role Non modifié', life: 3000});
                })
        }
        else{
            this.messageService.add({severity:'error', summary: 'Error', detail:'Role invalide'});
        }
    }
    Cancel(rolle: Roles){
        this.rolle= {...rolle};
        this.rolle=this.Clonesrol;
    }
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
            if(country.authority.toLowerCase().indexOf(query.toLowerCase()) ==0){
                filtered.push(country);
            }
                

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

    exportAsXLSX(user):void{
        this.tab=[];
        for (let i = 0; i < this.user?.length; i++) {
            this.json.nom = this.user[i].nom,
            this.json.prenom = this.user[i].prenom,
            this.json.email= this.user[i].email,
            this.json.matricule = this.user[i].matricule,
            this.json.telephone= this.user[i].telephone,
            this.json.reference= this.user[i].reference,
            // this.json.etat= this.result[i].enable,
  
            this.tab.push({...this.json});
            // console.log(this.result[i].utilisateur.matricule)
        }
        this.excelService.exportAsExcelFile(this.tab);
         console.log(this.tab)
    }
   
    exportPDF(user){
        this.tab=[];
        console.log(this.user)
        for (let i = 0; i < this.user.length; i++) {
            const tb = {
                nom: this.user[i].nom,
                prenom: this.user[i].prenom,
                email: this.user[i].email,
                matricule: this.user[i].matricule,
                telephone: this.user[i].telephone,
                reference: this.user[i].reference,
                // etat: this.result[i].enable,
            };
  
            this.tab.push({...tb});
            console.log(this.tab)
        }
        const colums= this.cols.map(col => col.field);
        const data = this.tab.map(row => colums.map(col => row[col]));
        console.log(data)
        
        const doc = new jsPDF();

        const texte = "Liste des utilisateur:  "+ this.currentService?.service.nomservice;
        doc.text(texte, 40, 20);

        const logoImg = new Image();
        logoImg.src = 'assets/layout/images/logoPoste.png';
        doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);
        
        autoTable(doc,{
            head: [colums],
            body: data,
            startY: 30,
        })
        doc.save(this.currentService?.service.nomservice+ '_ListeUtilisateur.pdf');

    }
}
