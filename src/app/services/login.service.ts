import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(private authService: AngularFireAuth) {
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.auth.signInWithEmailAndPassword(email, password).then(
        datos => resolve(datos),
        err => reject(err)
      );
    });
  }

  getAuth() {
    return this.authService.authState.pipe(
      map(
        auth => auth
      )
    );
  }

  logout() {
    this.authService.auth.signOut();
  }

  registrarUsuario(email: string, password: string) {
    return new Promise((res, rej) => {
      this.authService.auth.createUserWithEmailAndPassword(email, password)
      .then(
        datos => res(datos),
        err => rej(err)
      );
    });
  }
}
