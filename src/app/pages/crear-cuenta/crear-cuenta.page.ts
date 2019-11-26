import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthService} from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { ModalController,  } from '@ionic/angular';
import {TerminosCondicionesPage} from '../terminos-condiciones/terminos-condiciones.page';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {

  foto: any;
  ModalController: any;
  public nombre : string;
  public apellido : string;
  public genero : string;
  public email : string;
  public password : string;
  

  constructor( private auth : AuthService, private router : Router, private modalController: ModalController ) { }


  onSubmitRegister()
  {
    this.auth.register(this.nombre, this.apellido, this.genero,this.email, this.password).then(auth =>
    {
      this.router.navigate(['/inicio'])
      console.log(auth)
    }
    ).catch(err =>console.log(err))
  }
  async openModal() {
    var modal = await this.modalController.create({
      component: TerminosCondicionesPage
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
