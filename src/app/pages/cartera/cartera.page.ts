import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService, Item } from '../../servicios/storage.service';
import { EmpresaService } from '../../servicios/empresa.service';
import {AppfirebaseService} from '../../servicios/appfirebase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.page.html',
  styleUrls: ['./cartera.page.scss'],
})
export class CarteraPage implements OnInit {
  public LaSirena: any = 'assets\imagenes\La Sirena.png';
  public logo: string;
  public tarjetas : any = [];
  public tarjetasfbcliente : any = [];

  constructor(private empresaService: EmpresaService, private db : AppfirebaseService,private router : Router) {


      

  }

  ngOnInit() {

    this.db.ObtenerTarjetas().then(arraytarjetas =>
      {
        this.tarjetasfbcliente=[];
        this.tarjetasfbcliente = arraytarjetas;
      })

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

  obtenerLogo() {
    if (this.tarjetasfbcliente.tarjeta.EmpresaAsociada === 'La Sirena') {
      this.logo = this.LaSirena;
    }
    return "assets\imagenes\Jumbo.png";
  }

  botoneliminar(tarjeta : string)
  {
    console.log(tarjeta)
    this.db.EliminarTarjeta(tarjeta).then(res => 
    {
      this.db.ObtenerTarjetas().then(res =>
        {
          console.log("Aqui debe redireccionar:"+res);
          window.location.reload();
          this.router.navigate(['/cartera']);
        }
        )
      ;

    }
    )
    
    ;
    
  }

}
