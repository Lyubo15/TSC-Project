import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMenuesComponent } from './all-menues/all-menues.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuRoutingModule } from './menu-routing.module'
import { MenuService } from './menu.service';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { MenuProductsComponent } from './menu-products/menu-products.component';

@NgModule({
  declarations: [AllMenuesComponent, CreateMenuComponent, EditMenuComponent, MenuProductsComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MenuRoutingModule
  ],
  providers: [MenuService]
})
export class MenuModule { }
