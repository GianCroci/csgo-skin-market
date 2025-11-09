import { Component, Inject } from '@angular/core';
import { SkinsService } from '../../../api/services/skins/skins.service';
import { Producto } from '../../../modules/usuarios/interfaces/producto.interface';

@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {

  private skinService= Inject(SkinsService);

  private skinsCatalogo: Producto[]=[];



  mostrarTodasLasSkins(){
    console.log("Cargando las skins");
  }
}
