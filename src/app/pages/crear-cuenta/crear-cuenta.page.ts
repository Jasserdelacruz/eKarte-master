import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { ModalController,  } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';



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
  

  constructor( private auth : AuthService, private router : Router, private modalController: ModalController, 
               private afAuth: AngularFireAuth, private gplus: GooglePlus, public afauth: AngularFireAuth ) { }


  onSubmitRegister()
  {
    this.auth.register(this.nombre, this.apellido, this.genero,this.email, this.password).then(auth =>
    {
      this.router.navigate(['/inicio'])
      console.log(auth)
    }
    ).catch(err =>console.log(err))
  }

  GoogleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
 

  ngOnInit() {
  }

}
