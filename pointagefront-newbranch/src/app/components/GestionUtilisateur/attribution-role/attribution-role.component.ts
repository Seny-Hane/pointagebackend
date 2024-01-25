import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ServicesService } from 'src/app/service/services.service';
import { Service } from 'src/models/service';

@Component({
  selector: 'app-attribution-role',
  templateUrl: './attribution-role.component.html',
  styleUrls: ['./attribution-role.component.scss']
})
export class AttributionRoleComponent implements OnInit {
  services: Service[];
  currentService: Service;
  items: MenuItem[];
  
  constructor(
    public service : ServicesService,
  ) { }

  ngOnInit(): void {

    this.items = [
      {label: 'Services', routerLink: 'service'},
      {label: 'Utilisateurs', routerLink: 'users'},
      {label: 'Roles', routerLink: 'roles'},
 //     {label: 'Confirmation', routerLink: 'confirmation'}
  ];
  }

  filterItemsService(event) {
    
}

}
