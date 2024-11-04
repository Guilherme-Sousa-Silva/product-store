import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../../../shared/Interfaces/product.interface';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../shared/services/products.service';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';

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

  constructor(
    private router: Router,
    private productService: ProductsService,
    private matDialog: MatDialog) {}

  public onEdit(id: any) {
    this.router.navigateByUrl(`/edit-product/${id}`);
  }

  public onDelete(id: any) {
    this.openConfirmationDialog() == true ? this.productService.delete(id) : null;
  }

  public openConfirmationDialog(): any {
    const dialogRef = this.matDialog.open(ConfirmationModalComponent, {
      data: {
        modalContent: "Deseja mesmo excluir este item?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      return result;
    })
  }
}
