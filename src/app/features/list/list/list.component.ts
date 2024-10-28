import { Component, computed, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../shared/Interfaces/product.interface';
import { CardComponent } from '../components/card/card.component';
import { ProductsService } from '../../../shared/services/products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatButtonModule, CardComponent, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAll()
      .subscribe((product) => {
        this.products = product;
      })
  }
}
