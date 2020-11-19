import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/ProductService';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  formData: any = {};
  errors: any = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  addProduct(): void {
    console.log(this.formData);
    this.errors = [];
    this.productService.addProduct(this.formData)
      .subscribe(() => {
        this.router.navigate(['/products-list'], { queryParams: { added: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }

}
