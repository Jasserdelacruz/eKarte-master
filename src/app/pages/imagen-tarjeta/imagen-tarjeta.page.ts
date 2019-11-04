import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {AppfirebaseService} from '../../servicios/appfirebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService} from '../../servicios/storage.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { EmpresaService } from '../../servicios/empresa.service';

@Component({
  selector: 'app-imagen-tarjeta',
  templateUrl: './imagen-tarjeta.page.html',
  styleUrls: ['./imagen-tarjeta.page.scss'],
})


export class ImagenTarjetaPage implements OnInit {

  tarjetaID;
  imagen;

  constructor(storageservice: StorageService, datos: AppfirebaseService) {
    datos.ObtenerTarjetas();
    this.imagen = storageservice.ObtenerImagen(this.tarjetaID);
   }

  ngOnInit() {
  }

}
