import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Item } from '../models/Item';
import { Product } from '../models/product';
import { ProductService } from '../services/ProductService';

@Component({
	templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {

	items: Item[] = [];
	total: number = 0;
	myProduct: Product;
	item: Item;
	cart: any = [];

	constructor(
		// DI helps pass information from url to next component
		private activatedRoute: ActivatedRoute,
		private productService: ProductService
	) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
			console.log("ID: " + id);
			if (id) {
				this.productService.getProductById(id).subscribe(result => {
					this.myProduct = result;
					console.log("Product: " + this.myProduct);
					this.item = {
						product: this.myProduct,
						quantity: 1
					};

					// NEW STUFF BELOW

					// True if cart is empty
					console.log("if (" + JSON.parse(localStorage.getItem('cart')) + " == '')");
					if (JSON.parse(localStorage.getItem('cart')) == '') {
						console.log("localStorage empty");
						// let cart: any = [];
						this.cart.push(JSON.stringify(this.item));
						localStorage.setItem('cart', JSON.stringify(this.cart));
						console.log("first item inserted!")
					}
					// False if cart has items
					else {
						let cart: any = JSON.parse(localStorage.getItem('cart'));
						//console.log("Local Storage: " + JSON.parse(localStorage.getItem('cart'))[0]);
						let index: string = "-1";
						// for (var i = 0; i < cart.length; i++) {
						// 	// let item: Item = JSON.parse(cart[i]);
						// 	let item: Item = JSON.parse(cart[i]);
						// 	console.log("Type: " + typeof item);
						// 	console.log("Cart item " + i + " Reg: " + item);
						// 	console.log("Cart item " + i + " Product: " + item.product);
						// 	console.log("Cart item " + i + " Product ID: " + item.product.id);
						// 	console.log("---------------------------------");
						// 	console.log("Type: " + typeof cart[i]);
						// 	console.log("Cart item " + i + " Reg: " + cart[i]);
						// 	console.log("*---------------------------------*");
						// 	// Break if item is already in cart
						// 	if (item.product.id == id) {
						// 		index = i;
						// 		break;
						// 	}
						// }

						let i = 0;
						for (let cartElement of cart) {
							let item: Item = JSON.parse(cartElement);

							console.log("Type: " + typeof item);
							console.log("Cart item " + i + " Reg: " + item);
							console.log("Cart item " + i + " Product: " + item.product);
							console.log("Cart item " + i + " Product ID: " + item.product[0]._id);
							console.log("Cart item " + i + " Str: " + JSON.stringify(item));
							console.log("Cart item " + i + " Str: " + JSON.stringify(item.product));
							console.log("Cart item " + i + " Str: " + JSON.stringify(item.product[0]._id));
							console.log("---------------------------------");
							
							// Break if item is already in cart
							if (item.product[0]._id == id) {
								index = i.toString();
								break;
							}
							i++;
						}

						// True if item is not in cart
						if (index == "-1") {
							console.log("New item added!");
							cart.push(JSON.stringify(this.item));
							localStorage.setItem('cart', JSON.stringify(cart));
						}
						// False if item is already in cart
						else {
							console.log("Item quantity updated!");
							let item: Item = JSON.parse(cart[index]);
							item.quantity += 1;
							cart[index] = JSON.stringify(item);
							localStorage.setItem("cart", JSON.stringify(cart));
						}
					}
					this.loadCart();
					// END NEW STUFF
				});

				// PASTE NEW STUFF BACK HERE IF NEEDED


			}
			else {
				this.loadCart();
			}
		});
	}

	loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product[0].price * item.quantity;
		}
	}

	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product._id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}
	cartInfo: any;
	checkOut() {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		this.cartInfo = cart;
		console.log(cart);
		// You have to call post method to store cart details in DB
	}

}