export interface Usuario {
    id?: number;
  nombre: string;
  apellido: string;
  mail: string;
  password: string;
  direccion: string;
  localidad: string;
  provincia: string;
  pais: string;
  token?: string;
  rol?: string;
  verificado?: boolean;
  fechaIngreso?: Date;
}

