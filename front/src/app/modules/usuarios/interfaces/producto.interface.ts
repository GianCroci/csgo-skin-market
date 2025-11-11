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
