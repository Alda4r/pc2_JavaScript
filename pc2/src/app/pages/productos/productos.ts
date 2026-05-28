import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent {
  productos = [
    {
      nombre: 'Laptop Lenovo IdeaPad',
      categoria: 'Tecnología',
      precio: 3500,
      fechaRegistro: new Date(2026, 4, 10),
      stock: 8
    },
    {
      nombre: 'Mouse inalámbrico Logitech',
      categoria: 'Accesorios',
      precio: 85.5,
      fechaRegistro: new Date(2026, 4, 12),
      stock: 25
    },
    {
      nombre: 'Monitor Samsung 24 pulgadas',
      categoria: 'Tecnología',
      precio: 720,
      fechaRegistro: new Date(2026, 4, 15),
      stock: 12
    }
  ];
}
