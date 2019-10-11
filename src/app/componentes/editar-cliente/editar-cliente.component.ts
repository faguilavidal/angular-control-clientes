import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  id: string;

  constructor(private clienteService: ClienteService,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.getCliente(this.id).subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  guardar({value, valid}: {value: Cliente, valid: boolean}) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      value.id = this.id;
      // Modificar el cliente
      this.clienteService.modificar(value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if (confirm('Seguro que desea eliminar el cliente')) {
      this.clienteService.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
}
