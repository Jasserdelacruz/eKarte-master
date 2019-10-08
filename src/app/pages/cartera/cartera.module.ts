import { ComponentsModule } from './../../components/menu/components.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarteraPage } from './cartera.page';
import { NuevaTarjetaPage } from '../nueva-tarjeta/nueva-tarjeta.page';




const routes: Routes = [
  {
    path: '',
    component: CarteraPage,
  }
];

@NgModule({
  entryComponents: [
    NuevaTarjetaPage
 
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NuevaTarjetaPage

    
 

  ],
  declarations: [CarteraPage]
})
export class CarteraPageModule {}
