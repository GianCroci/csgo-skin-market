import { Routes } from '@angular/router';
import { Home } from './public/home/home';

export const routes: Routes = [

    {
        path: '',
        component: Home
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
