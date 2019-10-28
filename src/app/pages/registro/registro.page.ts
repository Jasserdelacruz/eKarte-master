import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from '../../servicios/auth.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  ngOnInit() {}


  constructor(private afAuth: AngularFireAuth, private gplus: GooglePlus, public afauth: AngularFireAuth) {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }



}
