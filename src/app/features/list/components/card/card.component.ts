import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/Interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  product = input.required<Product>();
  productTitle = computed(() => this.product().title);
  productId = computed(() => this.product().id);

  constructor(private router: Router) {}

  public onEdit(id: any) {
    this.router.navigateByUrl(`/edit-product/${id}`);
  }
}
