import { Router } from "express";
import usuarioRouter from "./usuario-router/usuario.routes.js";
import skinRouter from "./skins-router/skins.routes.js";


export class AppRoutes {

    static get routes():Router {

        const  router = Router();

        router.use('/api/usuario',usuarioRouter)
        router.use('/api/skin',skinRouter)

        return router;
    }

}