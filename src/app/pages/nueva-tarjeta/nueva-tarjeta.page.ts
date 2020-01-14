import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {AppfirebaseService} from '../../servicios/appfirebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService, Item } from '../../servicios/storage.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { EmpresaService } from '../../servicios/empresa.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-nueva-tarjeta',
  templateUrl: './nueva-tarjeta.page.html',
  styleUrls: ['./nueva-tarjeta.page.scss'],
})
export class NuevaTarjetaPage implements OnInit {

items: Item[] = [];
newItem: Item = <Item>{};
nombre:string ="";
empresaasociada:string ="";
fechaexpiracion:string = "";
puntos:string = "No consultados";
pathimagen:string = "Imagen no agregada desde Empresas";
codigotarjeta: string = ""
foto: any;
public tarjetas : any = [];
public tarjetaconsultada : any = []; 
public codigoempresa : string;

constructor(private empresaService: EmpresaService, private camera: Camera, private db : AppfirebaseService, private router: Router,
            private activatedRoute: ActivatedRoute, private storageService: StorageService, private ptl: Platform,
            public datePicker: DatePicker, public datePipe: DatePipe, public platform: Platform, private escanerBarra: BarcodeScanner
            ) {
  this.ptl.ready().then(() => {
    this.fechaexpiracion = this.datePipe.transform(new Date(), "dd-MM-yyyy");
  });
 }

addItem(){
  if (this.nombre.length==0)
  {
    alert("El campo descripción no ha sido completado, favor verificar.");
  }
  else if (this.empresaasociada.length==0)
  {
    alert("El campo empresa asociada  no ha sido completado, favor verificar");
  }
  else if (this.fechaexpiracion.length==0)
  {
    alert("La fecha de expiración no ha sido ingresada, favor verificar");
  }
  else
  {
    this.db.agregartarjeta(this.nombre, this.empresaasociada, this.fechaexpiracion,this.puntos, this.pathimagen,this.codigotarjeta).then(response =>
      {
        this.router.navigate(['/cartera']);
      }
      ).catch(error =>
      {
      // console.log(error);
      }  
        );
  }
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
            this.pathimagen=tarjetafor.URLImgTarjeta;
            this.codigotarjeta=tarjetafor.CodigoTarjeta
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

  EscanearCodigoBarras() {
    this.escanerBarra.scan().then(codigoBarraData => {
      console.log('Barcode data', codigoBarraData);
      this.codigotarjeta=''+codigoBarraData.text;
    }).catch(err => {
      console.log('Error', err);
    });

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
