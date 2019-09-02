import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
  { path: 'crear-cuenta', loadChildren: './pages/crear-cuenta/crear-cuenta.module#CrearCuentaPageModule' },
  { path: 'crear-contrasena', loadChildren: './pages/crear-contrasena/crear-contrasena.module#CrearContrasenaPageModule' },
  { path: 'recuperar-contrasena', loadChildren: './pages/recuperar-contrasena/recuperar-contrasena.module#RecuperarContrasenaPageModule' },
  { path: 'mistarjetas', loadChildren: './pages/mistarjetas/mistarjetas.module#MistarjetasPageModule' },  { path: 'cartera', loadChildren: './pages/cartera/cartera.module#CarteraPageModule' },
  { path: 'ajustes', loadChildren: './pages/ajustes/ajustes.module#AjustesPageModule' },
  { path: 'acerca-de', loadChildren: './pages/acerca-de/acerca-de.module#AcercaDePageModule' },
  { path: 'ayuda', loadChildren: './pages/ayuda/ayuda.module#AyudaPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
