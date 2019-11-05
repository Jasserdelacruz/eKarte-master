import { Component, OnInit } from '@angular/core';
import {AppfirebaseService} from '../../servicios/appfirebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService} from '../../servicios/storage.service';
import { Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { CarteraPage } from '../cartera/cartera.page';

@Component({
  selector: 'app-imagen-tarjeta',
  templateUrl: './imagen-tarjeta.page.html',
  styleUrls: ['./imagen-tarjeta.page.scss'],
})


export class ImagenTarjetaPage implements OnInit {

  tarjetaID: string;
  imagen: any;

  constructor(navParams: NavParams, storageService: StorageService, private modalCtrl: ModalController) {
    this.tarjetaID = navParams.get('idTarjeta');
    this.imagen = storageService.ObtenerImagen(this.tarjetaID);
   }

   dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }

}
