import { ComponentsModule } from './../../components/menu/components.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarteraPage } from './cartera.page';
import { ImagenTarjetaPage } from '../imagen-tarjeta/imagen-tarjeta.page';
import { ImagenTarjetaPageModule } from '../imagen-tarjeta/imagen-tarjeta.module';




const routes: Routes = [
  {
    path: '',
    component: CarteraPage,
  }
];

@NgModule({
  entryComponents: [
    ImagenTarjetaPage
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ImagenTarjetaPageModule

    
 

  ],
  declarations: [CarteraPage]
})
export class CarteraPageModule {}
