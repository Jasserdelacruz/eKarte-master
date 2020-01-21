import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService, public router: Router, 
              private afAuth: AngularFireAuth, private gplus: GooglePlus, public afauth: AngularFireAuth) { }

  ngOnInit() {
  }

  onSubmitLogin()
  {
    this.authService.login(this.email,this.password).then(res => 
      {
        if (this.authService.emailverification()==true)
         { 
          this.router.navigate(['/mistarjetas']);
         }
         else
         {
           alert("Debe Verificarse, hemos enviado un Email a su correo que debe confirmar.")
           this.authService.sendVerificationEmail();
         }
        }).catch(err => alert ('Los datos son incorrectos o no existe el usuario'));
    console.log("estas en la funcion")
  }



  async GoogleLogin() {
    try {
      const gplusUser = await this.gplus.login(
        {
          'webClientId': '813746992987-egpg9prsq2ci31s28btsfhqhuec85pkc.apps.googleusercontent.com',
          'offline': true,
          'scopes': '813746992987-compute@developer.gserviceaccount.com'
        }
      )
      return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
    } catch (error) {
      console.log(error);
    }


    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
        this.router.navigate(['/mistarjetas']);
      }).catch (err => alert ('Hubo un error, intente de nuevo.'));
    
  }
  

}
