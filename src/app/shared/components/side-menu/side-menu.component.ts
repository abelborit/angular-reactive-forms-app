import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string; // url al cual vamos a navegar
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth/sign-up' },
  ];
}
