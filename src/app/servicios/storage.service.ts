import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

imagen: any;
  constructor(private storage: Storage) { }

AgregarImagen(idTarjeta: string, imagen: any) {
  this.storage.set(idTarjeta, imagen);
}

ObtenerImagen(idFoto: string) {
  this.storage.get(idFoto).then((img) => {
   this.imagen = img;
  });
}


}
