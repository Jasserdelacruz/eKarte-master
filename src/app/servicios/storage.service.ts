import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

AgregarImagen(idTarjeta, imagen) {
  this.storage.set(idTarjeta, imagen);
}

ObtenerImagen(idTarjeta: string) {
  this.storage.get(idTarjeta).then((imagen) => {
    return imagen;
  });
}


}
