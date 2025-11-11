import { Producto } from "./producto.interface";

export interface Orden {
  id_orden: number;
  id_usuario: number;
  fecha: string;
  estado: string;
  total: number;
  skins: Producto[];
}
