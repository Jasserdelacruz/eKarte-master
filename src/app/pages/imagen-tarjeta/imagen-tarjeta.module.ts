import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImagenTarjetaPage } from './imagen-tarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenTarjetaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImagenTarjetaPage]
})
export class ImagenTarjetaPageModule {}
