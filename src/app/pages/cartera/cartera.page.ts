import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../servicios/empresa.service';
import {AppfirebaseService} from '../../servicios/appfirebase.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { PhotoViewer,PhotoViewerOptions } from '@ionic-native/photo-viewer/ngx';
import {NavController, ModalController} from '@ionic/angular';
import {ModalImagentarjetaPage} from '../modal-imagentarjeta/modal-imagentarjeta.page';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.page.html',
  styleUrls: ['./cartera.page.scss'],
})
export class CarteraPage implements OnInit {
  
  public tarjetas : any = [];
  public tarjetasfbcliente : any = [];

  constructor(private nav: NavController, private modalCtrl: ModalController, private photoViewer: PhotoViewer,
    private file: File, private router: Router,private empresaService: EmpresaService, private db : AppfirebaseService, public alertController: AlertController) {
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

  viewPhoto(url:string) {
    const option: PhotoViewerOptions =
    {
      share: true
    }

    this.photoViewer.show(url,"Imagen Barra Tarjeta",option)
   // alert(url);
  }

  async openModal(codigotarjeta:string)
  {
   const modal = await this.modalCtrl.create(
      {
        component: ModalImagentarjetaPage ,
        componentProps: 
        {
          CodigoTarjeta: codigotarjeta
        }

      }
    )
    await modal.present();
  //  console.log("nav"); 
   // this.nav.navigateForward(['/modal-cig',codigotarjeta]);
  }


}
