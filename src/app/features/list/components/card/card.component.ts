import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
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

  reloadList = signal<boolean>(false);
  @Output() reloadListChange = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private productService: ProductsService,
    private matDialog: MatDialog) {}

  public onEdit(id: any) {
    this.router.navigateByUrl(`/edit-product/${id}`);
  }

  public onDelete(id: any) {
    this.openConfirmationDialog(id);
  }

  public openConfirmationDialog(id: any): any {
    const dialogRef = this.matDialog.open(ConfirmationModalComponent, {
      data: {
        modalContent: "Deseja mesmo excluir este item?"
      }
    })
    .afterClosed()
    .subscribe((answer) => {
      if (answer) {
        this.productService.delete(id).subscribe(() => {})
        this.realoadListProduct();
      }
    })
  }

  realoadListProduct() {
    // Alterna o valor do sinal e emite o valor atualizado
    this.reloadList.update(value => !value); // Inverte o valor do sinal
    this.reloadListChange.emit(this.reloadList()); // Emite o novo valor para o pai
  }
}
