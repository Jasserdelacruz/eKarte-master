import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';


@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {
  public email : string;
  public emailresult : Object;
  constructor(private auth : AuthService) {
   }
    onResetEmail()
    {
      this.auth.sendResetPassword(this.email);
      this.emailresult = this.auth.sendResetPassword(this.email);
      console.log (this.emailresult)
    }

    ngOnInit() {

    }
}
