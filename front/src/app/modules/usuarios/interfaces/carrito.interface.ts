import {Carrito_Producto} from './carrito_producto.interface';

export interface Carrito{
  id:         number;
  id_usuario: number;
  carrito_producto?: Carrito_Producto[];
}
