import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ProductsService } from '../../shared/services/products.service';
import { CreateProduct } from '../../shared/Interfaces/create-product-interface';

@Component({
  selector: 'app-create-products',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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
    private productService: ProductsService
  ) {}

  onSubmit() {
    const { title } = this.form.value;

    if (!this.isNullOrEmpty(title)) {
      return;
    }
    this.productService.create({
      title: this.form.controls.title.value
    }).subscribe(() => {
      alert("Produto criado com sucesso");
    });
  }

  isNullOrEmpty(value: any): boolean {
    return value !== null && value !== '';
  }
}
