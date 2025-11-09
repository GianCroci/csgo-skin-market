import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Carousel, CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel-perfil',
  imports: [Carousel, CommonModule, CarouselModule],
  templateUrl: './carousel-perfil.html',
  styleUrls: ['./carousel-perfil.css'],

})
export class CarouselPerfil {

  skins: any[] = [];

  responsiveOptions: any[] = [];

  ngOnInit(){
    this.skins = [
      {name: "AK BloodShot", img: "/images/skins/ak_bloodshot.png"},
      {name: "AWP Hyperbeast", img: "/images/skins/awp_hyperbeast.png"},
      {name: "M4 GoldenCoil", img: "/images/skins/m4_goldencoil.png"},
      {name: "Karambit fade", img: "/images/skins/karambit_fade.png"},
      {name: "Gloves Jade", img: "/images/skins/gloves_jade.png"}
    ]

    this.responsiveOptions = []
      
  }

}
