import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecuperarContrasenaPage } from '../pages/recuperar-contrasena/recuperar-contrasena.page';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private hasverifiedemail = true;
  private resultresetpassword;
  
  constructor(private AFauth: AngularFireAuth, private db: AngularFirestore) { }

  emailverification()
  {

    this.AFauth.authState.subscribe(user =>
     { 
     if (user)
     { 
          this.hasverifiedemail = this.AFauth.auth.currentUser.emailVerified;
      }
    })     
    return this.AFauth.auth.currentUser.emailVerified;
  }

  sendVerificationEmail()
  {
    this.AFauth.auth.currentUser.sendEmailVerification();
  }

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

  sendResetPassword(email : string)
  {

         this.AFauth.auth.sendPasswordResetEmail(email).then(result => 
          {
            var SpanishError= "";
            const formrecuperarcontrasena = document.querySelector('#ion-content-recuperar-contrasena');
            formrecuperarcontrasena.querySelector('.error').innerHTML = "Hemos Enviado el Email de recuperacion, verifique su bandeja.";
          }
          ).catch(err => 
            {
              var SpanishError= "";
              const formrecuperarcontrasena = document.querySelector('#ion-content-recuperar-contrasena');
              
              if (err.code=="auth/argument-error")
              {
                SpanishError = "Peticion Fallida. Todos los argumentos del Email deben ser validos."
              }
              else if (err.code == "auth/user-not-found")
              {
                SpanishError = "El correo Ingresado no existe."
              }
              else if (err.code == "auth/invalid-email")
              {
                SpanishError = "El correo Ingresado es incorrecto."
              }
              else if (err.code == "auth/too-many-requests")
              {
                SpanishError = "Hemos bloqueado todas las peticiones de este dispositivo por actividad inusual. Favor intente mas tarde." 
              }
              else
              {
                SpanishError = err.code+"-"+err.message
              }
              formrecuperarcontrasena.querySelector('.error').innerHTML = SpanishError;
              console.log(err);
            }  
          );

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