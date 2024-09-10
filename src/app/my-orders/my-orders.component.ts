import { Component } from '@angular/core';
import { order } from '../data-types';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  public orderData: order[] | undefined;

  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: string | undefined) {
    orderId &&
      this.productService.cancelOrder(orderId).subscribe((result) => {
        if (result) {
          //? updating order history
          this.getOrderList();
        }
      });
  }
  getOrderList() {
    this.productService.myOrderList().subscribe((result) => {
      2;
      console.log(result);
      this.orderData = result;
    });
  }
}
