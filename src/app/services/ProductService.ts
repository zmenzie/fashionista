import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    /* LOOK IN SERVICES FOLDER FOR REFERENCE */
    private productUrl = 'http://localhost:5000/api/products';
    constructor(private http: HttpClient) { // DI for HttpClient
        
    }

    getProducts(): Observable<Product[]> {
        const URI = this.productUrl + '/productFromDb';
        console.log(URI);
        return this.http.get<Product[]>(URI);
    }

    getProductById(id: any): Observable<Product> {
        return this.http.get<Product>(`${this.productUrl}/productInfoById/${id}`);
    }

    addProduct(productData: any): Observable<any> {
        const URI = this.productUrl + '/addProduct';
        console.log(URI);
        return this.http.post(URI, productData);
    }

    updateProductById(product: Product, id: any): Observable<Product> {
        return this.http.put<Product>(`${this.productUrl}/${id}`, product);
    }

    deleteProductById(id: any): Observable<Product> {
        return this.http.delete<Product>(`${this.productUrl}/${id}`);
    }
}