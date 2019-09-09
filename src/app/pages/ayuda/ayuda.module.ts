import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AyudaPage } from './ayuda.page';

const routes: Routes = [
  {
    path: '',
    component: AyudaPage
  }
];

@NgModule({
  imports: [MatExpansionModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AyudaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AyudaPageModule {}

