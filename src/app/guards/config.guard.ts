import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConfigService } from '../services/config.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private configService: ConfigService
  ) {

  }

  canActivate(): Observable<boolean> {
    return this.configService.getConfig().pipe(
      map(
        config => {
          if (config.permitirRegistro) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      )
    );
  }
}
