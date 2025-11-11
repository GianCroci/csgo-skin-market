import { Component, effect, inject, signal } from '@angular/core';
import { UsuariosService } from '../../../../api/services/usuarios/usuarios.service';
import { Usuario } from '../../../../../../../back/src/models/usuario.model';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../api/services/auth.service';
import { VideoBackgroundComponent } from "../../../../shared/video-background/video-background";
import { CarouselPerfil } from "../../components/carousel-perfil/carousel-perfil";
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-mi-cuenta',
  imports: [VideoBackgroundComponent, CommonModule, CarouselModule],
  templateUrl: './mi-cuenta.html',
  styleUrl: './mi-cuenta.css',
})
export class MiCuenta {
  authService = inject(AuthService);
  usuario = signal<Usuario | null>(null)
  imagenUrl = 'images/skins/perfil-chem.png'

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

    this.skins = [
      {name: "AK BloodShot", img: "/images/skins/ak_bloodshot.png"},
      {name: "AWP Hyperbeast", img: "/images/skins/awp_hyperbeast.png"},
      {name: "M4 GoldenCoil", img: "/images/skins/m4_goldencoil.png"},
      {name: "Karambit fade", img: "/images/skins/karambit_fade.png"},
      {name: "Gloves Jade", img: "/images/skins/gloves_jade.png"}
    ]


  }

  ngOnDestroy(){

  }




  }
