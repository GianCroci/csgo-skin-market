//import { Routes } from '@angular/router';
import {Routes} from '@angular/router';
import {CreateUsuarioComponent} from './pages/create-usuario/create-usuario.component';
import {UpdateUsuarioComponent} from './pages/update-usuario/update-usuario.component';
import {ListPedidosComponent} from './pages/list-mis-pedidos/list-mis-pedidos';
import {ListDetallePedidoComponent} from './pages/list-detalle-pedido/list-detalle-pedido';
import {VerificarMail} from './pages/verificar-mail/verificar-mail';
import {Login} from './pages/login/login';
import {authGuard} from '../../api/guards/auth.guard';
import {ProductosCarritoUsuario} from './pages/productos-carrito-usuario/productos-carrito-usuario';
import { MiCuenta } from './pages/mi-cuenta/mi-cuenta';


export const usuariosRoutes: Routes = [

  {
    path: '',
    children: [

      {
        path: 'create-usuario',
        component: CreateUsuarioComponent
      },
      {
        path: 'update-usuario/:id',
        component: UpdateUsuarioComponent,
        canActivate: [authGuard]
      },
      {
        path: 'mi-cuenta',
        component: MiCuenta,
        canActivate: [authGuard]
      },
      {
        path: 'list-mis-pedidos',
        component: ListPedidosComponent,
        canActivate: [authGuard]
      },
      {
        path: 'orden/:id',
        component: ListDetallePedidoComponent,
        canActivate: [authGuard]
      },
      {

        path: 'verificar-mail/:token',
        component: VerificarMail
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'carrito-usuario',
        component: ProductosCarritoUsuario,
        canActivate: [authGuard]
      },
      {

        path: '**',
        redirectTo: 'list-usuarios'
      }
    ]
  }

];
