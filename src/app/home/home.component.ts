import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];

  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data) => {
      console.log(data);
      this.popularProducts = data;
    });
    this.productService.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });

    
  }
}
