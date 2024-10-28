import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-products',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './create-products.component.html',
  styleUrl: './create-products.component.scss'
})
export class CreateProductsComponent {

  form = new FormGroup({
    title: new FormControl<string>('', {
      validators: Validators.required, 
      nonNullable: true
    })
  });

  constructor(
    private productService: ProductsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit() {
    const { title } = this.form.value;

    if (!this.isNullOrEmpty(title)) {
      this.showMessage('Título do produto não pode ser vazio!')
      return;
    }

    this.productService.create({
      title: this.form.controls.title.value
    }).subscribe(() => {
      this.showMessage('Produto criado com sucesso!');
      this.router.navigateByUrl('');
    });
  }

  isNullOrEmpty(value: any): boolean {
    return value !== null && value !== '';
  }

  showMessage(message: string){
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }
}
