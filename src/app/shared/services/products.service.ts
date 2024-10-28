import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../Interfaces/product.interface';
import { Observable } from 'rxjs';
import { CreateProduct } from '../Interfaces/create-product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient)

  constructor() { }

  getAll(): Observable<Product[]> {
   return this.httpClient.get<Product[]>('/api/products');
  }

  create(product: CreateProduct) {
    return this.httpClient.post('/api/products', product)
  }
}
