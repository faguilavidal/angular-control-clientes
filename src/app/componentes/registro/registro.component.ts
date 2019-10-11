import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  email: string;
  password: string;


  constructor(
    private router: Router,
    private flashMessages: FlashMessagesService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  registro() {
    this.loginService.registrarUsuario(this.email, this.password)
    .then(
      res => {
        this.router.navigate(['/']);
      })
    .catch(
      err => {
        this.flashMessages.show(err.message, {
          cssClass: 'alert-danger',
          timeut: 4000
        });
      }
    );
  }
}
