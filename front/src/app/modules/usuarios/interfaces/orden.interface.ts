import { Producto } from './producto.interface';

export interface Orden {
  id?: number;
  fecha: Date;
  estado: string;
  pago: string;
  total: number;
  productos: Producto[];
}
