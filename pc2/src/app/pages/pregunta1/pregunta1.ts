import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pregunta1',
  standalone: true,
  templateUrl: './pregunta1.html',
  styleUrls: ['./pregunta1.css'],
  imports: [CommonModule]
})
export class Pregunta1Component {
  // resultado desglosado (no JSON)
  error: string | null = null;
  hasResult = false;
  nombresResult = '';
  nota1Result: number | null = null;
  nota2Result: number | null = null;
  nota3Result: number | null = null;
  nota4Result: number | null = null;
  sumaResult: number | null = null;
  promedioResult: number | null = null;
  estadoResult: string | null = null;
  observacionResult: string | null = null;

  submit(nombres: string, nota1: string, nota2: string, nota3: string, nota4: string) {
    // reset previo
    this.error = null;
    this.hasResult = false;

    const body = {
      nombres: (nombres || '').toString().trim(),
      nota1: Number(nota1),
      nota2: Number(nota2),
      nota3: Number(nota3),
      nota4: Number(nota4)
    };

    // Validaciones básicas
    if (!body.nombres) {
      this.error = 'Falta campo requerido: nombres';
      return;
    }

    const notas = ['nota1','nota2','nota3','nota4'];
    for (const n of notas) {
      const val = Number((body as any)[n]);
      if (isNaN(val)) {
        this.error = `Campo '${n}' inválido o ausente`;
        return;
      }
      // Validar enteros
      if (!Number.isInteger(val)) {
        this.error = `Campo '${n}' debe ser un número entero`;
        return;
      }
      if (val < 0 || val > 20) {
        this.error = `Campo '${n}' fuera de rango (0-20)`;
        return;
      }
    }

    // Procesar y asignar resultados individuales (simula backend sin devolver JSON)
    const { suma, promedio, estado, observacion } = this.processBackend(body);

    this.nombresResult = body.nombres;
    this.nota1Result = Number(body.nota1);
    this.nota2Result = Number(body.nota2);
    this.nota3Result = Number(body.nota3);
    this.nota4Result = Number(body.nota4);
    this.sumaResult = suma;
    this.promedioResult = promedio;
    this.estadoResult = estado;
    this.observacionResult = observacion;
    this.hasResult = true;
  }

  clear(nombresEl: HTMLInputElement, nota1El: HTMLInputElement, nota2El: HTMLInputElement, nota3El: HTMLInputElement, nota4El: HTMLInputElement) {
    nombresEl.value = '';
    nota1El.value = '';
    nota2El.value = '';
    nota3El.value = '';
    nota4El.value = '';
    this.error = null;
    this.hasResult = false;
    this.nombresResult = '';
    this.nota1Result = null;
    this.nota2Result = null;
    this.nota3Result = null;
    this.nota4Result = null;
    this.sumaResult = null;
    this.promedioResult = null;
    this.estadoResult = null;
    this.observacionResult = null;
  }

  clearInputs(nombresEl: HTMLInputElement, nota1El: HTMLInputElement, nota2El: HTMLInputElement, nota3El: HTMLInputElement, nota4El: HTMLInputElement) {
    nombresEl.value = '';
    nota1El.value = '';
    nota2El.value = '';
    nota3El.value = '';
    nota4El.value = '';
  }

  private processBackend(body: any) {
    const nota1 = Number(body.nota1 || 0);
    const nota2 = Number(body.nota2 || 0);
    const nota3 = Number(body.nota3 || 0);
    const nota4 = Number(body.nota4 || 0);

    const suma = nota1 + nota2 + nota3 + nota4;
    const promedioRaw = suma / 4;
    const promedio = Number(promedioRaw.toFixed(2));

    const estado = promedioRaw >= 13 ? 'Aprobado' : 'Desaprobado';

    let observacion = 'En riesgo';
    if (promedioRaw >= 17) observacion = 'Excelente';
    else if (promedioRaw >= 13 && promedioRaw < 17) observacion = 'Regular';

    return { suma, promedio, estado, observacion };
  }
}
