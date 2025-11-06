import {Router} from "express";
import { UsuarioController } from "../../controllers/usuario.controller.js";
import { verificarToken } from "../../services/middlewares/auth.middleware.js";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();


usuarioRouter.post('/',usuarioController.crearUsuario.bind(usuarioController));
usuarioRouter.post('/login',usuarioController.login.bind(usuarioController));
usuarioRouter.put('/:token',usuarioController.verificarMail.bind(usuarioController));


usuarioRouter.delete('/:id', verificarToken, usuarioController.eliminarUsuario.bind(usuarioController));
usuarioRouter.get('/', verificarToken, usuarioController.getUsuarios.bind(usuarioController));
usuarioRouter.get('/:id', verificarToken, usuarioController.getUsuario.bind(usuarioController));

// Obtener carrito del usuario autenticado
usuarioRouter.get('/carrito/:id', verificarToken, usuarioController.getProductosDelCarritoDeUnUsuario.bind(usuarioController));

// Agregar producto al carrito del usuario autenticado
usuarioRouter.post('/agregar/:id', verificarToken, usuarioController.postAgregarProductoAlCarrito.bind(usuarioController));

// Borrar producto del carrito del usuario autenticado
usuarioRouter.post('/borrarProducto/:id', verificarToken, usuarioController.postBorrarProductoDelCarrito.bind(usuarioController));

// Vaciar carrito del usuario autenticado
usuarioRouter.post('/vaciar/:id', verificarToken, usuarioController.postVaciarCarrito.bind(usuarioController));

export default usuarioRouter;