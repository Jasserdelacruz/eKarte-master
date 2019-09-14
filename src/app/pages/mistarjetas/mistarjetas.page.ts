import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../servicios/auth.service';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-mistarjetas',
  templateUrl: './mistarjetas.page.html',
  styleUrls: ['./mistarjetas.page.scss'],
})
export class MistarjetasPage implements OnInit {
  public hasverifiedemail : boolean;
  public sentTimestamp : Date;
  constructor(private auth : AuthService) {
    this.hasverifiedemail=true;
    setInterval(() => {
    this.hasverifiedemail= auth.emailverification();
     },4000);
    }

   onSendVerificationEmail()
   {
     this.auth.sendVerificationEmail();
     this.sentTimestamp = new Date();
   }

   onReload()
   {
     window.location.reload();
   }

  ngOnInit() {
  }
}