import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { IMenu } from '../interfaces/menu';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-all-menues',
  templateUrl: './all-menues.component.html',
  styleUrls: ['./all-menues.component.css']
})
export class AllMenuesComponent implements OnInit {

  loading: boolean;
  isUserAnAdmin = this.authService.isUserAnAdmin$;

  menues: IMenu[];

  constructor(
    private authService: AuthService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.menuService.getAllMenus().subscribe((menues) => {
      this.menues = menues;
      this.loading = false;
    })
  }

  deleteMenu(id: string) {
    this.loading = true;
    this.menuService.deleteMenu(id).subscribe(() => {
      this.loading = false;
      window.location.reload();
    })
  }
}
