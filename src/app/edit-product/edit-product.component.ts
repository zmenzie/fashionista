import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/ProductService';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  formData: any = {};
  errors: any = [];

  // Current values of product
  _id: string;
  name: string;
  price: number;
  photo: string;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this._id = params['_id'];
      this.name = params['name'];
      this.price = params['price'];
      this.photo = params['photo'];
      console.log(this._id);
      console.log(this.name);
    })
  }

  ngOnInit(): void {
  }

  updateProduct(): void {
    this.formData = {
      _id: this._id,
      name: this.name,
      price: this.price,
      photo: this.photo,
    }

    console.log(this.formData);

    this.productService.updateProduct(this.formData)
    .subscribe(() => {
      this.router.navigate(['/products-list'], { queryParams: { registered: 'success' } });
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });
  }

  deleteProduct(): void {
    console.log(this._id);
    this.errors = [];

    this.productService.deleteProduct(this._id)
      .subscribe(() => {
        this.router.navigate(['/products-list'], { queryParams: { registered: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }

}
