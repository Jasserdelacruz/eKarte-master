import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {AppfirebaseService} from '../../servicios/appfirebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService, Item } from '../../servicios/storage.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { EmpresaService } from '../../servicios/empresa.service';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  fechaexpiracion: string;

  constructor(private empresaService: EmpresaService,private camera: Camera, private db : AppfirebaseService, private router : Router, private activatedRoute: ActivatedRoute, 
    private storageService: StorageService, private ptl: Platform, public datePicker: DatePicker, public datePipe: DatePipe, public alertController: AlertController, 
    private auth: AuthService, private AFauth: AngularFireAuth) {
      this.ptl.ready().then(() => {
        this.fechaexpiracion = this.datePipe.transform(new Date(), "dd-MM-yyyy");
      });
     }
    
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Eliminar Cuenta',
      message: 'Si presiona "Continuar" va a eliminar su cuenta para siempre.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.BotonEliminarCuenta();
          }
        }
      ],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);

    

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

  BotonEliminarCuenta() {
    this.AFauth.auth.currentUser.delete();
    this.router.navigate(['/inicio']);
    console.log('Se eliminó la cuenta');

  }


  ngOnInit() {
  }

}