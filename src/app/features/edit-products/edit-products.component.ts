import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/Interfaces/product.interface';

@Component({
  selector: 'app-edit-products',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.scss'
})
export class EditProductsComponent implements OnInit {

  productId: any;

  form = new FormGroup({
    title: new FormControl<string>('', {
      validators: Validators.required,  
      nonNullable: true
    })
  });

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getIdFromUrl();
    this.getProductById();
  }

  onSubmit() {
    const { title } = this.form.value;

    if (!this.isNullOrEmpty(title)) {
      this.showMessage('Título do produto não pode ser vazio!')
      return;
    }

    const payload: Product = {
      id: this.productId,
      title: this.form.controls.title.value
    }

    this.productService.edit(payload).subscribe(() => {
      this.showMessage('Produto editado com sucesso!');
      this.router.navigateByUrl('');
    });
  }

  isNullOrEmpty(value: any): boolean {
    return value !== null && value !== '';
  }

  showMessage(message: string){
    this.snackBar.open(message, 'Ok');
  }

  onBack() {
    this.router.navigateByUrl('/');
  }

  public getIdFromUrl(): any {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  public getProductById() {
    this.productService.getById(this.productId)
      .subscribe((response) => {
        this.form.controls.title.setValue(response.title);
      });
  }
}
