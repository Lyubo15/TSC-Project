import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/product/interfaces/product';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-products',
  templateUrl: './menu-products.component.html',
  styleUrls: ['./menu-products.component.css']
})
export class MenuProductsComponent implements OnInit {

  products: any = null;
  loading: boolean;

  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const id = this.activatedRoute.snapshot.params.id;
    this.menuService.getAllMenuProducts(id).subscribe((products) => {
      this.products = products
      this.loading = false
    })
  }
}
