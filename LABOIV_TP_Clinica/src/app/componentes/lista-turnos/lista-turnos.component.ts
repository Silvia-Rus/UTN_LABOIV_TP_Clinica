import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ConfirmarTurnoService } from 'src/app/servicios/confirmar-turno.service';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent implements OnInit {

  constructor(public auth: AuthService, 
              public st: StorageService, 
              private ct: ConfirmarTurnoService) { }
  @Input() turnos: Turno[] = [];

  listaPacientes: any[] = [];
  listaItems: any;

  
  ngOnInit() {
    this.traerListaPacientes();
  }

  refrescarLista(turno: any)
  {
    for(let i = this.turnos.length - 1; i > -1 ; i--)
      {
        console.log(i);
        if(turno.dia == this.turnos[i].dia && 
           turno.hora == this.turnos[i].hora)
        {
          this.turnos.splice(i, 1);
        }
      }
  }

  traerListaPacientes() {
    this.st.getCollection('usuarios', 'nombre')
            .subscribe((datos) =>
              {
                this.listaItems = datos;
                for(let i = 0; i < this.listaItems.length; i++)
                {
                  if(this.listaItems[i].rol == 'Paciente')
                  {
                    this.listaPacientes.push(this.listaItems[i]);
                  }
                }
              })
  }
  abrirModal(turno: any)
  {
    var usuario = this.st.usuarioObj;
    if(usuario.rol == 'Paciente'){
      turno.turnoMasPaciente(turno, usuario.nombre, usuario.apellido, usuario.email);
      this.ct.confirmarTurno(turno).then(()=>{
      })
    }
    else
    {
      this.ct.confirmarTurnoAdmin(turno, this.listaPacientes);
    }
    this.refrescarLista(turno);
  }

}
