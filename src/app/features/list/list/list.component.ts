import { Component, computed, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../shared/Interfaces/product.interface';
import { CardComponent } from '../components/card/card.component';
import { ProductsService } from '../../../shared/services/products.service';
import { RouterModule } from '@angular/router';
import { NoItemComponent } from '../components/no-item/no-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatButtonModule, CardComponent, RouterModule, NoItemComponent],
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

  onReloadListChange(event: boolean) {
    if (event) {
      this.getAllProducts();
    }
  }
}
