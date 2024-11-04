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

  getById(id: any): Observable<Product> {
    return this.httpClient.get<Product>(`/api/products/${id}`)
  }

  create(product: CreateProduct) {
    return this.httpClient.post('/api/products', product)
  }

  edit(product: Product) {
    return this.httpClient.put(`/api/products/${product.id}`, product);
  }

  delete(id: any) {
    return this.httpClient.delete(`/api/products/${id}`);
  }
}
