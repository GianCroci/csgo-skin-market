/*export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  clasificacion: string;
  precio: number;
  imagen: string;
  stock: number;
}*/

export interface Producto {
  id?: number;
  nombre: string;
  id_arma_base: number;
  rareza: string;
  precio: number;
  imagen: string;
}