import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  /* se coloca el path inicial como path vacío y luego en sus children colocar las rutas hijas hace que pueda heredar el path padre que sería el path: 'auth'. Otra forma sería colocar directo las rutas hijas pero se tendría que modificar un poco el app-routing.module.ts como en el proyecto de: https://github.com/abelborit/angular-heroes-app/commit/a7fdbb94b8455bfa2ee5da46ef581fa05b79a0f2#diff-bdebfe9c9aa11d74e7d28dcfb0cc5c678070b2d01d56edad196cb18357f96487R26 */
  {
    path: '',
    children: [
      { path: 'sign-up', component: RegisterPageComponent },
      { path: '**', redirectTo: 'sign-up' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
