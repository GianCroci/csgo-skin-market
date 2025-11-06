import {Producto} from './producto.interface';

export interface Carrito_Producto{
  id:number;
  id_carrito:number;
  id_producto:number;
  cantidad:number;
  producto:Producto;
}
