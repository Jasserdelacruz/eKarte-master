import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor
  (
    private AFauth: AngularFireAuth, 
    private db: AngularFirestore
    
  ) { }

  login (email:string, password:string)
  {
    return new Promise ((resolve, rejected) =>
    {
        this.AFauth.auth.signInWithEmailAndPassword(email,password).then(user =>
          {
            resolve(user);
            console.log("estas logueado" + user)
          }).catch (err => rejected(err));
  
    });
  }
  register(nombre : string, apellido : string , genero : string , email: string, password: string)
  {
    return new Promise ((resolve, reject) => 
    {
      this.AFauth.auth.createUserWithEmailAndPassword(email,password).then(res => 
      {
        const uid = res.user.uid;
        
        this.db.collection('CUENTA').doc(uid).collection('Usuario').doc(uid).set({
          UID : uid,
          Nombre : nombre,
          Apellido : apellido,
          Email : email,
          Genero : genero,
        }).then(resinsert =>
        {
          console.log("Datos insertados correctamente" + resinsert);
        }  
        ).catch(err =>
          {
            console.log(err)
          }
          )
        ;
        resolve(res)

      }).catch (err => reject(err)) 
    })
  } 
}