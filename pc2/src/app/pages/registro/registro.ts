import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  nombre = '';
  categoria = '';
  precio = 0;
  stock = 0;

  productoRegistrado = false;

  guardarProducto() {
    this.productoRegistrado = true;
  }

  limpiarFormulario() {
    this.nombre = '';
    this.categoria = '';
    this.precio = 0;
    this.stock = 0;
    this.productoRegistrado = false;
  }
}
