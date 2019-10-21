import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Injectable({
  providedIn: 'root'
})



export class AlmacenamientoTarjetasService {


  foto: any;

  valorContador;
  numero: number;

  listaDatos = [];

  public constructor(public tarjetas: Storage, public contador: Storage, private camera: Camera) {}

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



  setTheValue(n: string, e: string, f: Date) {  // nombre, empresa, fecha
    this.contador.get('valor').then((valor) => {
      this.valorContador = valor;

      if (this.valorContador === null) {
      this.tarjetas.set('datosTarjeta1', [n, e, f]); // se agrega la tarjeta... Esta es la tarjeta 1
      this.contador.remove('valor'); // se borra el antiguo valor
      this.contador.set('valor', 2); // se "incrementa" el contador o mas bien se agrega el nuevo valor
    }

      if (this.valorContador === 2) {
      this.tarjetas.set('datosTarjeta2', [n, e, f]);
      this.contador.remove('valor');
      this.contador.set('valor', 3);
    }

      if (this.valorContador === 3) {
      this.tarjetas.set('datosTarjeta3', [n, e, f]);
      this.contador.remove('valor');
      this.contador.set('valor', 4);
    }

      if (this.valorContador === 4) {
      console.log('No puede agregar mas tarjetas');
      console.log('Actualice al plan premium');
    }


    });

    }


  getTarjeta() {
    this.tarjetas.get('datosTarjeta1').then((val) => {
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
    this.tarjetas.remove('datosTarjeta1');
    this.tarjetas.remove('datosTarjeta2');
    this.tarjetas.remove('datosTarjeta3');
    this.contador.clear();

  }
}
