import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaItems: any;
  tipoUser: string = '';
  verificado: string = '';

  constructor(private st: StorageService) { }
  ngOnInit() {
    this.traerListaActualizada();
  }

  traerListaActualizada() {
    this.st.getCollection('usuarios').subscribe(datos => this.listaItems = datos);
  }

  asignarTipoUserVerificado(tipo: string)
  {
    switch(tipo){
      case 'EspecialistaNV':
        this.tipoUser = 'Especialista';
        this.verificado = 'false';
        break;
      default:
        this.tipoUser = tipo;
        this.verificado = 'true';
    }
    
  }



}