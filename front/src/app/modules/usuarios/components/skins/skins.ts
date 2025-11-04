import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { Observable } from 'rxjs';
import { SkinsService } from '../../../../api/services/skins/skins.service';

@Component({
  selector: 'app-skins',
  imports: [],
  templateUrl: './skins.html',
  styleUrl: './skins.css',
})
export class Skins implements OnInit , OnDestroy {

  skinsService=inject(SkinsService);


  ngOnInit(): void {

    this.listarSkins();
  }

  ngOnDestroy(): void {
  }

  listarSkins(){
    this.skinsService.listSkins().subscribe(
      {

      next: (data:Producto[])=>{
        console.log(data);

      },
      error: ()=>{
      
      },
      complete:()=>{

      }
      }
    );
  } 

}
