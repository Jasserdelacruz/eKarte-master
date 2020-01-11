import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MistarjetasPage } from './mistarjetas.page';
import { ModalImagentarjetaPage } from '../modal-imagentarjeta/modal-imagentarjeta.page';
import { ComponentsModule } from '../../components/menu/components.module';
import { ModalImagentarjetaPageModule } from '../modal-imagentarjeta/modal-imagentarjeta.module';

const routes: Routes = [
  {
    path: '',
    component: MistarjetasPage
  }
];

@NgModule({
  entryComponents: [
    ModalImagentarjetaPage

],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ModalImagentarjetaPageModule,
    ComponentsModule,
  ],
  declarations: [MistarjetasPage]
})
export class MistarjetasPageModule {}
