import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

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

  onSubmit() {
    const { title } = this.form.value;
  }
}
