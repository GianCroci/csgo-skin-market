/*export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  clasificacion: string;
  precio: number;
  imagenUrl: string;
  stock: number;
}*/

export interface Producto {
  id_skin:      number;
  nombre_skin:  string;
  id_arma_base: number;
  rareza:       string;
  precio:       number;
  url_imagen:   string;
  
  armas: {
    id_arma:   number;
    nombre_arma: string;
    categoria: string; 
  };
  
}