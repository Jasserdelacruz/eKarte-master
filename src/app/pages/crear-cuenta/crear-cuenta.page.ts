import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { ModalController,  } from '@ionic/angular';




@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})

export class CrearCuentaPage implements OnInit {

  foto: any;
  ModalController: any;
  public nombre = '';
  public apellido = '';
  public genero = '';
  public email = '';
  public password = '';
  public passwordvalidate = '';
  public terminosYCondiciones: boolean;
  

  constructor( private auth : AuthService, private router : Router, private modalController: ModalController) {

    console.log(this.terminosYCondiciones);
   }


  onSubmitRegister() {
    // tslint:disable-next-line: max-line-length
    if (this.nombre !== '' && this.apellido !== '' && this.genero !== '' && this.email !== '' && this.password !== '' && this.passwordvalidate !== '' ) {
      if (this.password === this.passwordvalidate) {
        if (this.terminosYCondiciones === true) {
          this.auth.register(this.nombre, this.apellido, this.genero,this.email, this.password).then(auth =>
            {
              alert ('El usuario se ha registrado exitosamente.')
              this.router.navigate(['/inicio'])
              console.log(auth)
            }
            ).catch(err =>alert(err))
        } else {
          alert ('Debe aceptar los terminos y condiciones para crearse una cuenta');
        }
      
        
      } else {
        alert("La contraseña ingresada no es igual a la contraseña de confirmación");
        this.password="";
        this.passwordvalidate="";
      }
    } else {
      alert ('Todos los campos son obligatorios, por favor complete el formulario');
    }

  }

  GoogleLogin() {
    
  }
 

  ngOnInit() {
  }

}
