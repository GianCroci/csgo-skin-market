import { Producto } from './producto.interface';

export interface Orden {
  id?: number;
  fecha: Date;
  estado: string;
  pago: string;
  envio: string;
  total: number;
  productos: Producto[];
}
