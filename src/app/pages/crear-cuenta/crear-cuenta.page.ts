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
  public nombre : string;
  public apellido : string;
  public genero : string;
  public email : string;
  public password : string;
  public passwordvalidate : string;
  

  constructor( private auth : AuthService, private router : Router, private modalController: ModalController) { }


  onSubmitRegister()
  {
    if(this.password == this.passwordvalidate)
    {
      this.auth.register(this.nombre, this.apellido, this.genero,this.email, this.password).then(auth =>
      {
        alert ('El usuario se ha registrado exitosamente.')
        this.router.navigate(['/inicio'])
        console.log(auth)
      }
      ).catch(err =>alert(err))
    }
    else
    {
      alert("La contraseña ingresa no es igual a la contraseña de confirmación.");
      this.password="";
      this.passwordvalidate="";
    }

  }

  GoogleLogin() {
    
  }
 

  ngOnInit() {
  }

}
