//import { Routes } from '@angular/router';
import {Routes} from '@angular/router';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';
import { CreateUsuarioComponent } from './pages/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from './pages/update-usuario/update-usuario.component';
import { ListPedidosComponent } from './pages/list-mis-pedidos/list-mis-pedidos';
import { ListDetallePedido } from './pages/list-detalle-pedido/list-detalle-pedido';

export const usuariosRoutes: Routes = [

    {
        path : '',
        children : [
            {
                path : 'list-usuarios',
                component : ListUsuariosComponent
            },
            {
                path : 'create-usuario',
                component : CreateUsuarioComponent
            },
            {
                path : 'update-usuario/:id',
                component : UpdateUsuarioComponent
            },
            {
                path : 'list-mis-pedidos',
                component : ListPedidosComponent
            },
            {
              path: 'orden/:id',
              component: ListDetallePedido
            },
            {
                path : '**',
                redirectTo : 'list-usuarios'
            }
        ]
    }

];
