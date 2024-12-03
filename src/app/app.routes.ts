import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { UsersComponent } from './componentes/users/users.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { PoketablaComponent } from './componentes/poketabla/poketabla.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
      { path: 'perfil', component: PerfilComponent },
      { path: 'users', component: UsersComponent },
      { path: 'pokemon', component: PoketablaComponent },
    ],
  },
];
