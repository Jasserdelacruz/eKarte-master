import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MistarjetasPage } from './mistarjetas.page';

const routes: Routes = [
  {
    path: '',
    component: MistarjetasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MistarjetasPage]
})
export class MistarjetasPageModule {}
