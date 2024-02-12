import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ServicesService } from 'src/app/service/services.service';
import { Service } from 'src/models/service';

@Component({
  selector: 'app-attribution-role',
  styleUrls: ['./attribution-role.component.scss'],
  templateUrl: './attribution-role.component.html',
})
export class AttributionRoleComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  services: any;
  currentService: Service;


  constructor(private _formBuilder: FormBuilder,
              public service : ServicesService,) {}

  
  
  ngOnInit(): void {
    this.getAllService();
  
  }

  getAllService() {
    this.service.getAllService().subscribe( data => {
            this.services = data;
            this.services.sort((a,b) => a.nomservice.localeCompare(b.nomservice));
        },
        error => {
            console.log(error)
        })
}

  filterItemsService(event) {
    let filtered : any[] = [];
    let query = event.query;
    for(let i = 0; i < this.services.length; i++) {
        let item = this.services[i];
        if (item.nomservice.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(item);
        }
    }
    this.services = filtered;
}



}
