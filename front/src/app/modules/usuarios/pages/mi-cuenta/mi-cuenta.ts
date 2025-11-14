import { Component, effect, inject, signal } from '@angular/core';
import { Usuario } from '../../../../../../../back/src/models/usuario.model';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../api/services/auth.service';
import { VideoBackgroundComponent } from "../../../../shared/video-background/video-background";
import { CarouselPerfil } from "../../components/carousel-perfil/carousel-perfil";
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { OrdenService } from '../../../../api/services/ordenes/orden.service';
import { SkinsService } from '../../../../api/services/skins/skins.service';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-mi-cuenta',
  imports: [VideoBackgroundComponent, CommonModule, CarouselModule, RouterLink],
  templateUrl: './mi-cuenta.html',
  styleUrl: './mi-cuenta.css',
})
export class MiCuenta {
  authService = inject(AuthService);
  usuario = signal<Usuario | null>(null)
  imagenUrl = 'images/skins/perfil-chem.png'
  ordenesService = inject(OrdenService);
  skinsService = inject(SkinsService);
  id_skin: any[] = [];
  skins: any[] = [];

  responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  constructor() {
    effect(() => {
      const user = this.authService.user();
      if (user) {
        this.usuario.set(user);
      }
    });
  }

  ngOnInit() {

    this.authService.recargarUsuario();
    this.skinsCompradasUsuario();
    console.log('IDs de skins compradas:', this.id_skin);

    this.skins = [
    /*  {name: "AK BloodShot", img: "/images/skins/ak_bloodshot.png"},*/
      
    ]
  }

  ngOnDestroy(){

  }

  skinsCompradasUsuario(): void {
    const idUsuario = this.authService.user()?.id!;
    this.ordenesService.getOrdenesPorUsuario(idUsuario).subscribe({
      next: (ordenes: any[]) => {
        for (const orden of ordenes) {
          if(orden.skins_ids && Array.isArray(orden.skins_ids)){
            for (const skin of orden.skins_ids) {
              this.id_skin.push(skin);
            }
          }
        }
        this.listarEnMiCuentaSkinsCompradas();
      },
      error: (err) => {
        console.error('Error al obtener órdenes del usuario:', err);  
      }
    });
  }

  listarEnMiCuentaSkinsCompradas(): void{
    console.log('Listando skins compradas...');
    for (const id of this.id_skin){
      console.log('Cargando skin con ID:', id);
    this.skinsService.getSkinById(id).subscribe({
      next: (skin) => {
        const skin_data = {
          id: skin.id_skin,
          name: skin.nombre_skin,
          img: skin.url_imagen
        };
        this.skins.push(skin_data);
      },
      error: (err) => {
        console.error('Error al cargar la skin:', err);  
      }
    });
  }
  }

  }
