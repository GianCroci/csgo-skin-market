import { Producto } from './producto.interface';

export interface Orden {
  id_orden?: number;
  fecha: Date;
  estado: string;
  total: number;
  productos: Producto[];
}
