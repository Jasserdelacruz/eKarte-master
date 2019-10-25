import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {AppfirebaseService} from '../../servicios/appfirebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService, Item } from '../../servicios/storage.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';





@Component({
  selector: 'app-nueva-tarjeta',
  templateUrl: './nueva-tarjeta.page.html',
  styleUrls: ['./nueva-tarjeta.page.scss'],
})
export class NuevaTarjetaPage implements OnInit {

items: Item[] = [];
newItem: Item = <Item>{};
nombre:string;
empresaasociada:string;
fechaexpiracion:string = "";
foto: any;



constructor(private camera: Camera, private db : AppfirebaseService, private router : Router, private activatedRoute: ActivatedRoute, 
private storageService: StorageService, private ptl: Platform, public datePicker: DatePicker, public datePipe: DatePipe, public platform: Platform) {
  this.ptl.ready().then(() => {
    this.fechaexpiracion = this.datePipe.transform(new Date(), "dd-MM-yyyy");
  });
 }



addItem(){
  this.db.agregartarjeta(this.nombre, this.empresaasociada, this.fechaexpiracion).then(response =>
  {
    this.router.navigate(['/cartera']);
  }
  ).catch(error =>
  {
   // console.log(error);
  }  
    );
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

  SelectDate() {
    var options = {
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }

    this.datePicker.show(options).then ((date) => {
      this.fechaexpiracion = this.datePipe.transform(date, "dd-MM-yyyy");
    });

  }


  ngOnInit() {
  }

}
