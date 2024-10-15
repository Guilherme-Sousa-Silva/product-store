import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  products: any[] = [];
  httpClient = inject(HttpClient);  

  ngOnInit() {
    this.httpClient.get<any>('/api/products').subscribe((products: any) => {
      this.products = products
    })
  }
}
