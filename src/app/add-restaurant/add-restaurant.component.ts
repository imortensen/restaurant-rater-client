import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'

import { Restaurant } from '../restaurant'
import { RestaurantService } from '../services/restaurant.service'
import { FindRestaurantService } from '../services/findRestaurant.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
})
export class AddRestaurantComponent {
  addRestaurantForm
  findRestaurantForm
  googleRestaurants

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: RestaurantService,
    private findService: FindRestaurantService
  ) {
    this.addRestaurantForm = this.formBuilder.group({
      name: '',
    })
    this.findRestaurantForm = this.formBuilder.group({
      keyword: '',
    })
  }

  add(gRestaurant: any): void {
    if (!gRestaurant) {
      return
    }
    const newRestaurant = {
      name: gRestaurant.name,
      vicinity: gRestaurant.vicinity,
      place_id: gRestaurant.place_id,
    }
    this.service.addRestaurant(newRestaurant).subscribe(() => this.goBack())
  }

  findRestaurant(): void {
    const keyword = this.findRestaurantForm.get('keyword').value.trim()
    if (!keyword) {
      return
    }
    this.findService.findRestaurant(keyword).subscribe((googleRestaurants) => {
      this.googleRestaurants = googleRestaurants
      console.log(this.googleRestaurants)
    })
  }

  goBack(): void {
    this.router.navigate(['/restaurant-list'])
  }
}
