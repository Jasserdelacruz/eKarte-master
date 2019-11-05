import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService} from '../../servicios/storage.service';
import { EmpresaService } from '../../servicios/empresa.service';
import {AppfirebaseService} from '../../servicios/appfirebase.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ImagenTarjetaPage } from '../imagen-tarjeta/imagen-tarjeta.page';
import { CapturarFotoService } from '../../servicios/capturar-foto.service';


@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.page.html',
  styleUrls: ['./cartera.page.scss'],
})
export class CarteraPage implements OnInit {
  public tarjetas : any = [];
  public tarjetasfbcliente : any = [];

  constructor(private empresaService: EmpresaService, private db: AppfirebaseService, public alertController: AlertController,
              public modalController: ModalController, private storageService: StorageService, private obtenerFoto: CapturarFotoService) {

    db.ObtenerTarjetas().then(arraytarjetas =>
    {
      this.tarjetasfbcliente = [];
      this.tarjetasfbcliente = arraytarjetas;
    });

    
  }

  async presentModal(IDTarjeta: string) {
    this.storageService.AgregarImagen(IDTarjeta, this.storageService.imagen);
    const modal = await this.modalController.create({
      component: ImagenTarjetaPage,
      componentProps: {
        'idTarjeta': IDTarjeta,

      }
    });
    return await modal.present();
    
  }

  ngOnInit() {

    this.empresaService.getRemoteData().subscribe(
      data =>
      { 
     //   console.log("Remote Data");
    //    console.log(data);
        const obj = (data as any);
    //        const obj_json = JSON.parse(obj);
        obj.forEach(element => {
          this.tarjetas.push(element)
        });
        //console.log(obj);
        //this.items = this.shapshotToArray (data);
      }), error =>
      {
        console.log(error);
      };
    console.log (this.tarjetas);
  }


  botoneliminar(tarjeta : string)
  {
    console.log(tarjeta)
    this.db.EliminarTarjeta(tarjeta).then(res => 
    {
      window.location.reload();

    }
    )
    
    ;
    
  }


  async informacionTarjeta(tarjeta, informacion) {
    const alert = await this.alertController.create({
      header: tarjeta,
      subHeader: 'Informacion',
      message: informacion,
      buttons: ['OK']
    });

    await alert.present();
  }

}
