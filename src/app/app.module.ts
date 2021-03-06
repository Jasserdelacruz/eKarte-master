import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { firebaseConfig } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import { AngularFirestore } from '@angular/fire/firestore';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),NoopAnimationsModule, AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule,AngularFireStorageModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
