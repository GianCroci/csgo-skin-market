//import { Routes } from '@angular/router';
import {Routes} from '@angular/router';
import { CreateUsuarioComponent } from './pages/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from './pages/update-usuario/update-usuario.component';
import { ListPedidosComponent } from './pages/list-mis-pedidos/list-mis-pedidos';
import { ListDetallePedido } from './pages/list-detalle-pedido/list-detalle-pedido';
import { VerificarMail } from './pages/verificar-mail/verificar-mail';
import { Login } from './pages/login/login';


export const usuariosRoutes: Routes = [

    {
        path : '',
        children : [
            
            {
                path : 'create-usuario',
                component : CreateUsuarioComponent
            },
            {
                path : 'update-usuario/:id',
                component : UpdateUsuarioComponent
            },
            {
<<<<<<< HEAD
<<<<<<< HEAD
                path : 'list-mis-pedidos',
                component : ListPedidosComponent
            },
            {
              path: 'orden/:id',
              component: ListDetallePedido
            },
            {
=======
>>>>>>> e49316a (first commit)
=======
                path : 'verificar-mail/:token',
                component : VerificarMail
            },
            {
                path : 'login',
                component : Login
            },
            {
>>>>>>> c5d35b3 (login)
                path : '**',
                redirectTo : 'list-usuarios'
            }
        ]
    }
<<<<<<< HEAD

=======
    
>>>>>>> e49316a (first commit)
];
