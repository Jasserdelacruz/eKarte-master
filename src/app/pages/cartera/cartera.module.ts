import { ComponentsModule } from './../../components/menu/components.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarteraPage } from './cartera.page';
import { ModalImagentarjetaPage } from '../modal-imagentarjeta/modal-imagentarjeta.page';
import { ModalImagentarjetaPageModule } from '../modal-imagentarjeta/modal-imagentarjeta.module';



const routes: Routes = [
  {
    path: '',
    component: CarteraPage,
  }
];

@NgModule({
  entryComponents: [
      ModalImagentarjetaPage
  
  ],
  imports: [
    ModalImagentarjetaPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [CarteraPage]
})
export class CarteraPageModule {}
