import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService, public router: Router, private afAuth: AngularFireAuth,
              public afauth: AngularFireAuth, public googlePlus: GooglePlus ) { }

  ngOnInit() {
  }

  onSubmitLogin()
  {
    this.authService.login(this.email,this.password).then(res =>
      {
        if (this.authService.emailverification()===true)
         {
          this.router.navigate(['/mistarjetas']);
         }
         else
         {
           alert('Debe Verificarse, hemos enviado un Email a su correo que debe confirmar.')
           this.authService.sendVerificationEmail();
         }
        }).catch(err => alert ('Los datos son incorrectos o no existe el usuario'));
    console.log('estas en la funcion')
  }

  login() {
    this.googlePlus.login({})
    .then(res => console.log(res))
    .catch(err => console.error(err));




    }

    }








