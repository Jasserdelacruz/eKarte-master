import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {
  public email = '';
  constructor(private auth: AuthService, public router: Router) {}

    onResetEmail() {
      if (this.email !== '') {
        this.auth.sendResetPassword(this.email);
        alert ('Hemos enviado un mensaje a su correo, verifique y siga los pasos indicados en el mensaje.');
        this.router.navigate(['/inicio']);
        

      } else {
        alert ('Ha dejado el campo vacio, por favor introduzca su correo.');
      }
      
    }

    ngOnInit() {

    }
}
