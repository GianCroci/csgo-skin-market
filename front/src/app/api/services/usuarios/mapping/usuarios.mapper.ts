import { Usuario } from "../../../../modules/usuarios/interfaces/usuario.interface";
import { UsuarioRest } from "./usuario.interface.rest";

export class UsuarioMapper {

    static mapRestUsuarioToUsuario(usuarioRest:UsuarioRest):Usuario{
        return {
            id : usuarioRest.id,
            nombre : usuarioRest.nombre,
            apellido : usuarioRest.apellido,
            mail : usuarioRest.mail,
            password : usuarioRest.password,
            token : usuarioRest.token,
            rol : usuarioRest.rol,
            verificado : usuarioRest.verificado,
            fechaIngreso : usuarioRest.fechaIngreso
        }
    }

    static mapRestUsuarioArrayToUsuarioArray(usuariosRest:UsuarioRest[]): Usuario[]{
        return usuariosRest.map(this.mapRestUsuarioToUsuario);
    }

}