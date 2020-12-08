import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product';
import { ProductService } from '../services/ProductService';

@Component({
	templateUrl: 'product.component.html',
	styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

	products: Product[];

	constructor(
		// Dependency Injection (DI) for ProductService
		private productService: ProductService
	) { }

	ngOnInit() {
		this.productService.getProducts().subscribe(result => {
			this.products = result;
			console.log(this.products);
		})
	}

	// Potential methods for buttons to expand/close all images
	expandAll() {

	}

	closeAll() {

	}

}