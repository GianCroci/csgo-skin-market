import { Component,  inject, OnDestroy, OnInit, signal } from '@angular/core';
import { SkinsService } from '../../../api/services/skins/skins.service';
import { Producto } from '../../../modules/usuarios/interfaces/producto.interface';
import { Subscription } from 'rxjs';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../shared/product-card/product-card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { UsuariosService } from '../../../api/services/usuarios/usuarios.service';
import { AuthService } from '../../../api/services/auth.service';
import { MessageService } from 'primeng/api';
import {Toast} from 'primeng/toast';
import { Usuario } from '../../../modules/usuarios/interfaces/usuario.interface';

@Component({
  selector: 'app-catalogo',
  imports: [
    CommonModule,
    PaginatorModule,
    ProductCard,
    FormsModule,
    InputTextModule,
    ButtonModule,
    Toast
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
  providers: [MessageService],
})
export class Catalogo implements OnInit, OnDestroy {
  private skinService = inject(SkinsService);
  private skinSubscription?: Subscription;
  public skinsCatalogo: Producto[] = [];
  public skinsFiltrados: Producto[] = []; // NUEVO: array filtrado
  public skinsEnPaginaActual: Producto[] = [];
  public rows: number = 9;
  public totalRec: number = 0;
  usuarioService = inject(UsuariosService);
  authService = inject(AuthService);
  usuario = signal<Usuario | null>(null)
  messageService = inject(MessageService);
  idUsuario!: number;


  rarezas: { label: string, value: string }[] = [];

  filters = {
    nombre: '',
    rareza: '',
    precioMin: null as number | null,
    precioMax: null as number | null
  };

  private readonly FILTER_STORAGE_KEY = 'skinFilters';

  ngOnInit(): void {
    this.loadFiltersFromStorage();
    this.mostrarTodasLasSkins();
  }

  ngOnDestroy(): void {
    this.skinSubscription?.unsubscribe();
  }

  mostrarTodasLasSkins(): void {
    console.log("Cargando las skins");
    this.skinSubscription = this.skinService.listSkins().subscribe({
      next: (skins: Producto[]) => {
        this.skinsCatalogo = skins;
        this.extractClasificaciones();
        this.applyFilters(); // Aplica filtros guardados
      },
      error: (err: any) => {
        console.log("Error al cargar las skins", err);
      }
    });
  }

  onPageChange(event: PaginatorState) {
    const startIndex = event.first || 0;
    const endIndex = startIndex + (event.rows || this.rows);

    // CLAVE: Pagina sobre el array FILTRADO
    this.skinsEnPaginaActual = this.skinsFiltrados.slice(startIndex, endIndex);
    window.scrollTo(0, 0);
  }

  onAgregarProducto(producto: Producto) {
    // Tu lógica aquí
    this.idUsuario = this.authService.user()?.id!;
    //console.log('¡¡EVENTO FINAL RECIBIDO EN HOME!! Agregando:', producto.nombre_skin);
    if(!this.idUsuario){
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'Inicia sesión para agregar productos.',key:'br' });
      console.log('Inicia sesion para agregar productos.');
      return;
    }
    this.usuarioService.postAgregarProductoAlCarrito(this.idUsuario, { productoId: producto.id_skin }).subscribe({
        next: () => {
          console.log('Producto agregado correctamente');
        },
        error: () => {
          console.error('Error al agregar el producto');
        },
        complete: () => {
          this.showBottomRight()

        }
      }
    )
  }

  showBottomRight() {
    this.messageService.add({
      severity: 'success',
      summary: 'Producto agregado correctamente',
      detail: 'El producto ha sido añadido a tu carrito de compras.',
      key: 'br',
      life: 3000
    });
  }

  extractClasificaciones(): void {
    const uniqueRarezas = [...new Set(
      this.skinsCatalogo.map(skin => skin.rareza)
    )].filter(Boolean).sort();

    this.rarezas = uniqueRarezas.map(rareza => ({
      label: rareza,
      value: rareza
    }));
  }

  applyFilters(): void {
    // Empieza con TODOS los productos
    let filtered = [...this.skinsCatalogo];

    // Filtro por nombre
    if (this.filters.nombre && this.filters.nombre.trim() !== '') {
      filtered = filtered.filter(skin =>
        skin.nombre_skin.toLowerCase().includes(this.filters.nombre.toLowerCase())
      );
    }

    // Filtro por rareza
    if (this.filters.rareza && this.filters.rareza.trim() !== '') {
      filtered = filtered.filter(skin =>
        skin.rareza === this.filters.rareza
      );
    }

    // Filtro por precio mínimo
    if (this.filters.precioMin !== null && this.filters.precioMin > 0) {
      filtered = filtered.filter(skin =>
        skin.precio >= this.filters.precioMin!
      );
    }

    // Filtro por precio máximo
    if (this.filters.precioMax !== null && this.filters.precioMax > 0) {
      filtered = filtered.filter(skin =>
        skin.precio <= this.filters.precioMax!
      );
    }

    // Guarda el resultado filtrado
    this.skinsFiltrados = filtered;
    this.totalRec = filtered.length;

    // Muestra la primera página
    this.skinsEnPaginaActual = this.skinsFiltrados.slice(0, this.rows);
  }

  private saveFiltersToStorage(): void {
    try {
      sessionStorage.setItem(this.FILTER_STORAGE_KEY, JSON.stringify(this.filters));
    } catch (error) {
      console.error('Error guardando filtros:', error);
    }
  }

  private loadFiltersFromStorage(): void {
    try {
      const stored = sessionStorage.getItem(this.FILTER_STORAGE_KEY);
      if (stored) {
        this.filters = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error cargando filtros:', error);
    }
  }

  onFilterChange(): void {
    this.applyFilters();
    this.saveFiltersToStorage();
  }

  clearFilters(): void {
    this.filters = {
      nombre: '',
      rareza: '',
      precioMin: null,
      precioMax: null
    };

    this.applyFilters();
    this.saveFiltersToStorage();
  }
}
