import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-imagentarjeta',
  templateUrl: './modal-imagentarjeta.page.html',
  styleUrls: ['./modal-imagentarjeta.page.scss'],
})
export class ModalImagentarjetaPage implements OnInit {
  @Input() CodigoTarjeta :String;
  CodigoTarjetaQR: String;
  CodigoTarjetaBarCode: String;
  constructor(private modalCtrl : ModalController) {
    if (1==1)
    {
 
      this.CodigoTarjetaBarCode = this.CodigoTarjeta;
      console.log(this.CodigoTarjeta);
    }
    else
    {
      this.CodigoTarjetaQR = this.CodigoTarjeta;
    }

   }

  salirSinArgumentos()
  {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
