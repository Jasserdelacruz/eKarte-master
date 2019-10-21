import { AlmacenamientoTarjetasService } from './../../servicios/almacenamiento-tarjetas.service';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService, Item } from '../../servicios/storage.service';
import { Storage } from '@ionic/storage';
import { NuevaTarjetaPage } from '../nueva-tarjeta/nueva-tarjeta.page';




@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.page.html',
  styleUrls: ['./cartera.page.scss'],
})


export class CarteraPage implements OnInit {


  constructor(public obtenerTarjeta: AlmacenamientoTarjetasService) {

  obtenerTarjeta.getTarjeta();

}









ngOnInit() {

}




}
