
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AlmacenamientoTarjetasService } from '../../servicios/almacenamiento-tarjetas.service';





@Component({
  selector: 'app-nueva-tarjeta',
  templateUrl: './nueva-tarjeta.page.html',
  styleUrls: ['./nueva-tarjeta.page.scss'],
})
export class NuevaTarjetaPage implements OnInit {

  // fotoTarjeta;
  nombreTarjeta: string;
  empresaAsociadaTarjeta: string;
  fechaExpiracionTarjeta: Date;



public constructor(public guardarTarjeta: AlmacenamientoTarjetasService) {

}



guardarDatos() {

  this.guardarTarjeta.setTheValue(this.nombreTarjeta, this.empresaAsociadaTarjeta, this.fechaExpiracionTarjeta);
}

borrarTodasLasTarjetas() {

  this.guardarTarjeta.deleteTarjeta();
}


  ngOnInit() {
  }



}
