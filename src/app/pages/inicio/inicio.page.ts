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



  GoogleLogin() {
    this.gplus.login({
      'webClientId':'684698051198-3eilqgfacn9vd98rarq71gvv9im4bsa0.apps.googleusercontent.com',
      offline:true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idtoken))
      .then(succ=>{
        alert("Login exitoso")
      }).catch(ns=>{
        alert("Login no exitoso")
      })
    })
  }
  

}
