import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { ProductosComponent } from './pages/productos/productos';
import { RegistroComponent } from './pages/registro/registro';
import { Pregunta1Component } from './pages/pregunta1/pregunta1';
import { Pregunta2Component } from './pages/pregunta2/pregunta2';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'productos', component: ProductosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'pregunta1', component: Pregunta1Component },
  { path: 'pregunta2', component: Pregunta2Component },
  { path: '**', redirectTo: 'inicio' }
];
