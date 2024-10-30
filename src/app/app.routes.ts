import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list/list.component';
import { CreateProductsComponent } from './features/create-products/create-products.component';

export const routes: Routes = [
    {
    path: '',
    component: ListComponent
    },
    {
        path: 'create-product',
        loadComponent: () => import('./features/create-products/create-products.component').then(m => m.CreateProductsComponent)   
    },
    {
        path: 'edit-product/:id',
        loadComponent: () => import('./features/edit-products/edit-products.component').then(m => m.EditProductsComponent)
    }
];
