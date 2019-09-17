import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { Timestamp } from 'rxjs';
import {NavController ,ActionSheetController } from '@ionic/angular';
import {Camera, PictureSourceType} from "@ionic-native/camera/ngx";
import * as Tesseract from "tesseract.js";

@Component({
  selector: 'app-mistarjetas',
  templateUrl: './mistarjetas.page.html',
  styleUrls: ['./mistarjetas.page.scss'],
})
export class MistarjetasPage implements OnInit {
  public hasverifiedemail : boolean;
  public sentTimestamp : Date;
  selectedImage: any;
  imageText: string;
  progress: number;

  constructor(private auth : AuthService, private actionSheetCtrl:ActionSheetController, private camera: Camera, public navCtrl: NavController) {
    this.hasverifiedemail=true;
    setInterval(() => {
    this.hasverifiedemail= auth.emailverification();
     },4000);
    }

   onSendVerificationEmail()
   {
     this.auth.sendVerificationEmail();
     this.sentTimestamp = new Date();
   }

  onTest()
  {
    console.log("testFunction");
  }

   async selectSource() 
   {
     console.log ("Into SelectSource");
      let actionSheet = this.actionSheetCtrl.create({
        buttons:[
          {
            text: "Use Library",
            handler: () => {
              this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);         
            }
          }, {
            text: "Capture Image",
            handler: () => {
              this.getPicture(this.camera.PictureSourceType.CAMERA);
            }
          }, {
            text: "Cancel",
            role: "cancel"
          }

        ]
      });
     (await actionSheet).present();
   }

   getPicture(sourceType:PictureSourceType)
   {
      this.camera.getPicture({
        
        quality:100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: sourceType,
        allowEdit: true,
        saveToPhotoAlbum:false,
        correctOrientation: true
        
      }).then(imageData => 
        {
          this.selectedImage = 'data:image/jpeg;base64,' + imageData;;
        }
        )
   }
   
  recognizeImage()
  {
//    Tesseract.recognize(this.selectedImage).progress(message=> {
 //     if (message.status === "recognizing text")
 //     {
  //      console.log(message.progress);
  //    }
  //  })
  //  .catch(err => console.error(err))
  //  .then(result => 
 //   {
 //    this.imageText = result.text;
 //   })
  //  .finally(resultOrError => {
    //Progress Bar Finally
   // }
      
    //  );
  }

   onReload()
   {
     window.location.reload();
   }

  ngOnInit() {
  }
}