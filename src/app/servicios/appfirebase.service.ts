import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ArrayType } from '@angular/compiler';


interface tarjeta
{
  EmpresaAsociada : String
  FechaExpiracion : String
  Nombre : String
  UID : String
  Puntos: String
}

@Injectable({
  providedIn: 'root'
})
export class AppfirebaseService {
  public tarjetas : Array<Object> = [];
  private User : any;

  constructor( private db: AngularFirestore, private AFauth: AngularFireAuth) 
  { 

  }

  agregartarjeta(nombre:string,empresaasociada:string,fechaexpiracion:string,puntos:string,pathimagen:string)
  {
    return new Promise ((resolve, reject) => 
    { 
      this.AFauth.auth.onAuthStateChanged( user => {
          console.log("UID: " + user.uid);
          console.log("Generado ID" +this.db.createId());
          this.ContarTarjetas().then(cont =>
            {
              var GeneratedUID =this.db.createId();
              console.log("ContarTarjetas()")
              console.log(cont);
              this.db.collection('CUENTA').doc(user.uid).collection('Tarjeta').doc(''+GeneratedUID+'').set({
                UID : GeneratedUID,
                Nombre : nombre,
                EmpresaAsociada : empresaasociada,
                FechaExpiracion : fechaexpiracion,
                Puntos : puntos,
                PathImagen : pathimagen
              }).then(resinsert =>
              {
                resolve("Datos insertados correctamente" + resinsert);
              }  
              ).catch(err =>
                {
                  reject(err)
                }
                )
            })
        })
    })
      /*
 
      ;
    */

  }   

  ContarTarjetas()
  {
    return new Promise ((resolve, reject) => 
    {
      this.AFauth.auth.onAuthStateChanged( user => {
      console.log("UID: " + user.uid);
      var cont = 0;
      this.db.collection('CUENTA').doc(user.uid).collection('Tarjeta').snapshotChanges().subscribe(collection =>
      {
        collection.map(tarjeta => 
        {
          cont++;
        })
        resolve(cont);
      });
    })
  })}



  ObtenerTarjetas()
  {
    return new Promise ((resolve, reject) => 
    {
      this.AFauth.auth.onAuthStateChanged( user => {
      console.log("UID: " + user.uid);
      this.tarjetas=[];
      this.db.collection('CUENTA').doc(user.uid).collection('Tarjeta').snapshotChanges().subscribe(collection =>
      {
        collection.map(tarjeta => 
        {
          const data : tarjeta = tarjeta.payload.doc.data() as tarjeta;
          data.UID = tarjeta.payload.doc.id;
          this.tarjetas.push(data);
        })
      });
      console.log("ObtenerTarjetas()");
      console.log(this.tarjetas);
      resolve(this.tarjetas);
    })

  })}

  EliminarTarjeta(Tarjeta: string)
  {
    return new Promise ((resolve, reject) => 
    {
      this.AFauth.auth.onAuthStateChanged( user => {
      console.log("UID: " + user.uid);
      this.db.collection('CUENTA').doc(user.uid).collection('Tarjeta').doc(Tarjeta).delete().then(res =>
       {
         resolve("Tarjeta Eliminada");
      }
        );
    })

  })
  }
}