import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { Timestamp } from 'rxjs';
import { EmpresaService } from '../../servicios/empresa.service';
import { AppfirebaseService } from '../../servicios/appfirebase.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { PhotoViewer, PhotoViewerOptions } from '@ionic-native/photo-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ModalImagentarjetaPage } from '../modal-imagentarjeta/modal-imagentarjeta.page';


@Component({
  selector: 'app-mistarjetas',
  templateUrl: './mistarjetas.page.html',
  styleUrls: ['./mistarjetas.page.scss'],
})
export class MistarjetasPage implements OnInit {

  public hasverifiedemail: boolean;
  public sentTimestamp: Date;
  public tarjetas: any = [];
  public tarjetasfbcliente: any = [];

  constructor(private auth: AuthService, private empresaService: EmpresaService, private db : AppfirebaseService, 
    private nav: NavController, private modalCtrl: ModalController, private photoViewer: PhotoViewer, public alertController: AlertController,
    private file: File) {this.hasverifiedemail = true;
                                          setInterval(() => {this.hasverifiedemail = auth.emailverification(); } , 4000);
                                          db.ObtenerTarjetas().then(arraytarjetas =>
                                            {
                                              this.tarjetasfbcliente=[];
                                              this.tarjetasfbcliente = arraytarjetas;
                                            }); }

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

   onSendVerificationEmail()
   {
     this.auth.sendVerificationEmail();
     this.sentTimestamp = new Date();
   }

   onReload()
   {
     window.location.reload();
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