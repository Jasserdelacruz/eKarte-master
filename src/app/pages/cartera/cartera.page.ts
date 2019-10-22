import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService, Item } from '../../servicios/storage.service';
import { EmpresaService } from '../../servicios/empresa.service';
import {AppfirebaseService} from '../../servicios/appfirebase.service';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.page.html',
  styleUrls: ['./cartera.page.scss'],
})
export class CarteraPage implements OnInit {

  public tarjetas : any = [];
  public tarjetasfbcliente : any = [];

  constructor(private empresaService: EmpresaService, private db : AppfirebaseService) {
    db.ObtenerTarjetas().then(arraytarjetas =>
    {
      this.tarjetasfbcliente=[];
      this.tarjetasfbcliente = arraytarjetas;
    }  
    )
  }

  ngOnInit() {
    this.empresaService.getRemoteData().subscribe(
      data =>
      { 
     //   console.log("Remote Data");
    //    console.log(data);
        const obj = (data as any);
    //        const obj_json = JSON.parse(obj);
        obj.forEach(element => {
          this.tarjetas.push(element)
        });
        //console.log(obj);
        //this.items = this.shapshotToArray (data);
      }), error =>
      {
        console.log(error);
      };
      console.log (this.tarjetas);
  }
}
