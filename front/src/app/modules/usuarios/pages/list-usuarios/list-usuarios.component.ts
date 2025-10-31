import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TablaUsuariosList } from "../../components/tabla-usuarios-list/tabla-usuarios-list";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-list-usuarios',
  imports: [TableModule, ProgressSpinnerModule, TablaUsuariosList, ToastModule,Toast],
  templateUrl: './list-usuarios.component.html',
  styleUrl: './list-usuarios.component.css',
  providers : [MessageService]
})
export class ListUsuariosComponent implements OnInit, OnDestroy {

  spinner = true;

  usuarios: Usuario[] = [];
  usuarioService = inject(UsuariosService);
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.listarUsuarios();
  }

  ngOnDestroy(): void {}

  listarUsuarios() {
    this.usuarioService.listUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
      },
      complete: () => {
        this.spinner = false;
      },
    });
  }
}
