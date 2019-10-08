import { Platform } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthService} from '../../servicios/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService, Item } from '../../servicios/storage.service';
import {Storage} from '@ionic/storage';



@Component({
  selector: 'app-nueva-tarjeta',
  templateUrl: './nueva-tarjeta.page.html',
  styleUrls: ['./nueva-tarjeta.page.scss'],
})
export class NuevaTarjetaPage implements OnInit {

items: Item[] = [];
newItem: Item = <Item>{};

foto: any;

nombre: string;
empresaAsociada: string;
fechaExpiracion: Date;

tarjeta = {
 nombre : this.nombre,
 empresaAsociada : this.empresaAsociada,
 fechaExpiracion : this.fechaExpiracion
};

listaTarjetas = [];




constructor(private camera: Camera, private auth : AuthService, private router : Router, private activatedRoute: ActivatedRoute, 
private storageService: StorageService, private ptl: Platform, public tarjetas: Storage) {



  this.ptl.ready().then(() => {
    this.loadItems();
  });
 }

loadItems(){
  this.storageService.getItems().then(items => {
    this.items = items;
  });
}

addItem(){
  this.newItem.modified = Date.now();
  this.newItem.id = Date.now();

  this.storageService.addItem(this.newItem).then(item => {
    this.newItem = <Item>{};
    this.loadItems();
  });
}
  
  tomarfoto() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true

    };
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }


  setTheValue() {
    this.tarjeta.nombre = this.nombre;
    this.tarjeta.empresaAsociada = this.empresaAsociada;
    this.tarjeta.fechaExpiracion = this.fechaExpiracion;
    this.listaTarjetas.push([this.tarjeta.nombre, this.tarjeta.empresaAsociada, this.tarjeta.fechaExpiracion]);
    if (this.listaTarjetas.length === 1) {
      this.tarjetas.set('datosTarjeta', this.listaTarjetas[0]);
    }

    if (this.listaTarjetas.length === 2) {
      this.tarjetas.set('datosTarjeta2', this.listaTarjetas[1]);
    }

    if (this.listaTarjetas.length === 3) {
      this.tarjetas.set('datosTarjeta3', this.listaTarjetas[2]);
    }



    }


    
  

  getTarjeta() {
    this.tarjetas.get('datosTarjeta').then((val) => {
      console.log(val);
    });

    this.tarjetas.get('datosTarjeta2').then((val) => {
      console.log(val);
    });

    this.tarjetas.get('datosTarjeta3').then((val) => {
      console.log(val);
    });

  }

  deleteTarjeta() {
    this.tarjetas.remove('datosTarjeta');
    this.tarjetas.remove('datosTarjeta2');
    this.tarjetas.remove('datosTarjeta3');
  }


  ngOnInit() {
  }

}
