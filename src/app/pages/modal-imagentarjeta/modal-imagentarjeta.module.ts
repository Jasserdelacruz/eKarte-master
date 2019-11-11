import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalImagentarjetaPage } from './modal-imagentarjeta.page';
import { NgxBarcodeModule } from 'ngx-barcode';
import {NgxQRCodeModule} from 'ngx-qrcode2';



@NgModule({
  imports: [
    NgxBarcodeModule,
    NgxQRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ModalImagentarjetaPage]
})
export class ModalImagentarjetaPageModule {}
