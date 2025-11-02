import { Routes } from '@angular/router';
import { Home } from './public/home/home';
import { Login } from './modules/usuarios/pages/login/login';

import { list } from '@primeuix/themes/aura/autocomplete';
import { pendingUntilEvent } from '@angular/core/rxjs-interop';


export const routes: Routes = [

    {
        path: '',
        component: Login
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'usuarios',
        loadChildren: () => import('./modules/usuarios/usuarios.routes').then(u => u.usuariosRoutes)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
