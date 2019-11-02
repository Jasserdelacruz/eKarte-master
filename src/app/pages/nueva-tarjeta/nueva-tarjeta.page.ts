import { Platform } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthService} from '../../servicios/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService, Item } from '../../servicios/storage.service';



@Component({
  selector: 'app-nueva-tarjeta',
  templateUrl: './nueva-tarjeta.page.html',
  styleUrls: ['./nueva-tarjeta.page.scss'],
})
export class NuevaTarjetaPage implements OnInit {

items: Item[] = [];
newItem: Item = <Item>{};

foto: any;



constructor(private camera: Camera, private auth : AuthService, private router : Router, private activatedRoute: ActivatedRoute, 
private storageService: StorageService, private ptf: Platform) {
  this.ptf.ready().then(() => {
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


  ngOnInit() {
  }

}
