import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService, Item } from '../../servicios/storage.service';
import { EmpresaService } from '../../servicios/empresa.service';
import {AppfirebaseService} from '../../servicios/appfirebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.page.html',
  styleUrls: ['./cartera.page.scss'],
})
export class CarteraPage implements OnInit {
  public LaSirena: any = 'assets\imagenes\La Sirena.png';
  public logo: string;
  public tarjetas : any = [];
  public tarjetasfbcliente : any = [];

  constructor(private empresaService: EmpresaService, private db : AppfirebaseService, public alertController: AlertController) {
    db.ObtenerTarjetas().then(arraytarjetas =>
    {
      this.tarjetasfbcliente=[];
      this.tarjetasfbcliente = arraytarjetas;
    })


      

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

  obtenerLogo() {
    if (this.tarjetasfbcliente.tarjeta.EmpresaAsociada === 'La Sirena') {
      this.logo = this.LaSirena;
    }
    return "assets\imagenes\Jumbo.png";
  }

  botoneliminar(tarjeta : string)
  {
    this.tarjetasfbcliente=[];
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
