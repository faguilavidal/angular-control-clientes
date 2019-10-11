import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Config } from '../../models/config.model';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  permitirRegistro = false;

  constructor(
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.configService.getConfig()
    .subscribe(
      (config: Config) => {
        this.permitirRegistro = config.permitirRegistro;
      }
    );
  }

  guardar() {
    const config = {permitirRegistro: this.permitirRegistro};
    this.configService.editConfig(config);
    this.router.navigate(['/']);
  }
}
