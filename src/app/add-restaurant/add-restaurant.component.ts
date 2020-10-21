import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Restaurant } from '../restaurant';
import { RestaurantService } from '../services/restaurant.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {
  addRestaurantForm;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: RestaurantService
    ) { 
    this.addRestaurantForm = this.formBuilder.group({
      name: ''
    });
  }

  add(): void {

    let name = this.addRestaurantForm.get('name').value.trim();
    if (!name) { return; }
    this.service.addRestaurant({ name } as Restaurant)
      .subscribe(() => this.goBack());
  }

  goBack() {
    this.router.navigate(['/restaurant-list']);
  }

}
