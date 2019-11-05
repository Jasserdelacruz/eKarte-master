import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {AppfirebaseService} from '../../servicios/appfirebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService} from '../../servicios/storage.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { EmpresaService } from '../../servicios/empresa.service';
import { CapturarFotoService } from '../../servicios/capturar-foto.service';





@Component({
  selector: 'app-nueva-tarjeta',
  templateUrl: './nueva-tarjeta.page.html',
  styleUrls: ['./nueva-tarjeta.page.scss'],
})
export class NuevaTarjetaPage implements OnInit {

imagen: any;
nombre:string;
empresaasociada:string;
fechaexpiracion:string = "";
puntos:string = "No Consultados en Empresa";
public tarjetas : any = [];
public tarjetaconsultada : any = []; 
public codigoempresa : string;

constructor(private empresaService: EmpresaService, private db : AppfirebaseService, private router : Router, 
            private activatedRoute: ActivatedRoute, private storageService: StorageService, private ptl: Platform, 
            public datePicker: DatePicker, public datePipe: DatePipe, public platform: Platform, private capturarFoto: CapturarFotoService) {

  this.ptl.ready().then(() => {
    this.fechaexpiracion = this.datePipe.transform(new Date(), "dd-MM-yyyy");
  });
 }



addItem(idTarjeta) {
  this.db.agregartarjeta(this.nombre, this.empresaasociada, this.fechaexpiracion,this.puntos).then(response =>
  {
    this.router.navigate(['/cartera']);
  }
  ).catch(error =>
  {
   // console.log(error);
  }  
    );

  
}

AgregarTarjetaDesdeEmpresa()
{
    this.empresaService.getRemoteData().subscribe(
      data =>
      {
        this.tarjetas=[];
        this.tarjetaconsultada=[];
     //   console.log("Remote Data");
    //    console.log(data);
        const obj = (data as any);
    //        const obj_json = JSON.parse(obj);
        obj.forEach(element => {
          this.tarjetas.push(element);
        });

        this.tarjetas.forEach(tarjetafor => {
          if (tarjetafor.CodigoTarjeta==this.codigoempresa)
          {
            this.nombre=tarjetafor.Cliente;
            this.empresaasociada=tarjetafor.Empresa;
            this.fechaexpiracion=tarjetafor.FechaVencimiento;
            this.puntos=tarjetafor.Puntos;
          }
        });
        console.log(this.tarjetaconsultada);

 //       this.tarjetas.forEach(tarjetafor => {
   //       console.log(tarjetafor.CodigoTarjeta)
    //      if (tarjetafor.CodigoTarjeta=this.codigoempresa)
     //       this.tarjetaconsultada.push(tarjetafor) 
     //   });
        //console.log(obj);
        //this.items = this.shapshotToArray (data);
      }), error =>
      {
        console.log(error);
      };



}

  tomarfoto() {
    this.capturarFoto.CapturarFoto();
    this.imagen = this.capturarFoto.foto;
  }

  SelectDate() {
    var options = {
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }

    this.datePicker.show(options).then ((date) => {
      this.fechaexpiracion = this.datePipe.transform(date, "dd-MM-yyyy");
    });

  }

  


  ngOnInit() {



  }

}
