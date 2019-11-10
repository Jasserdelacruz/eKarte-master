import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrearCuentaPage } from './crear-cuenta.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TerminosCondicionesPage } from '../terminos-condiciones/terminos-condiciones.page';


const routes: Routes = [
  {
    path: '',
    component: CrearCuentaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),

  ],
  declarations: [CrearCuentaPage, TerminosCondicionesPage],
  entryComponents:[TerminosCondicionesPage]
})
export class CrearCuentaPageModule {}
