import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pregunta2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pregunta2.html',
  styleUrls: ['./pregunta2.css']
})
export class Pregunta2Component {
  nombre = '';
  correo = '';
  peso: number | null = null;
  altura: number | null = null;

  errorNombre = '';
  errorCorreo = '';
  errorPeso = '';
  errorAltura = '';

  popupMessage = '';
  popupVisible = false;

  imc: string | null = null;
  categoria = '';
  hasResult = false;

  send(form: NgForm) {
    this.clearErrors();
    const nombreValido = this.validarNombre();
    const correoValido = this.validarCorreo();
    const pesoValido = this.validarPeso();
    const alturaValida = this.validarAltura();

    if (!nombreValido || !correoValido || !pesoValido || !alturaValida) {
      this.hasResult = false;
      return;
    }

    const peso = this.peso ?? 0;
    const altura = this.normalizarAltura(this.altura ?? 0);
    const imcValor = peso / (altura * altura);
    this.imc = imcValor.toFixed(2);
    this.categoria = this.evaluarCategoria(imcValor);
    this.hasResult = true;
  }

  validarNombre() {
    if (!this.nombre || this.nombre.trim().length < 3) {
      this.openPopup('Nombre obligatorio, mínimo 3 caracteres.');
      return false;
    }
    return true;
  }

  validarCorreo() {
    if (!this.correo) {
      this.openPopup('Correo obligatorio.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.correo)) {
      this.openPopup('Formato de correo no válido.');
      return false;
    }
    return true;
  }

  validarPeso() {
    if (this.peso === null || this.peso === undefined || this.peso === 0) {
      this.openPopup('Peso obligatorio.');
      return false;
    }
    if (this.peso < 10 || this.peso > 300) {
      this.openPopup('Peso debe estar entre 10 y 300 kg.');
      return false;
    }
    return true;
  }

  validarAltura() {
    if (this.altura === null || this.altura === undefined || this.altura === 0) {
      this.openPopup('Altura obligatoria.');
      return false;
    }
    const altura = this.normalizarAltura(this.altura);
    if (altura < 0.5 || altura > 2.5) {
      this.openPopup('Altura debe estar entre 0.5 y 2.5 metros.');
      return false;
    }
    return true;
  }

  normalizarAltura(valor: number) {
    if (valor > 10 && valor <= 250) {
      return valor / 100;
    }
    return valor;
  }

  openPopup(message: string) {
    this.popupMessage = message;
    this.popupVisible = true;
  }

  closePopup() {
    this.popupVisible = false;
    this.popupMessage = '';
  }

  evaluarCategoria(imc: number) {
    if (imc < 18.5) {
      return 'bajo peso';
    }
    if (imc < 25) {
      return 'peso saludable';
    }
    if (imc < 30) {
      return 'sobrepeso';
    }
    return 'obesidad';
  }

  clearErrors() {
    this.errorNombre = '';
    this.errorCorreo = '';
    this.errorPeso = '';
    this.errorAltura = '';
    this.closePopup();
  }
}
