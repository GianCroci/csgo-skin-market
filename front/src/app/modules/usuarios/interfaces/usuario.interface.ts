export interface Usuario {
    id?: number;
  nombre: string;
  apellido: string;
  mail: string;
  password: string;
  token?: string;
  rol?: string;
  verificado?: boolean;
  fechaIngreso?: Date;
}

