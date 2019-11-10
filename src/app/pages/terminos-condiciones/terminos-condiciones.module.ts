import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TerminosCondicionesPage } from './terminos-condiciones.page';

const routes: Routes = [
  {
    path: '',
    component: TerminosCondicionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),Component
  ],
  declarations: [TerminosCondicionesPage]
})
export class TerminosCondicionesPageModule {}
