import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paciente } from './interfaces/interfaces.components';
import { PacienteCard } from './paciente-card/paciente-card';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PacienteCard],
  template: `
    <div class="enfermeria-container">
      <h1>🏥 Z-0: MONITOR DE BIO-SEÑALES</h1>

      <div class="grid-pacientes">
        @for (paciente of pacientes; track paciente.id) {
          <app-paciente-card [pacienteInfo]="paciente" (curarClick)="administrarCura(paciente)" (bajaClick)="darDeBaja($event)"></app-paciente-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .enfermeria-container {
      background: #111;
      color: #eee;
      padding: 20px;
      min-height: 100vh;
      font-family: sans-serif;
    }

    .grid-pacientes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    

    .peligro {
      border-color: red;
      box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
    }

    

    .acciones {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }

    button {
      cursor: pointer;
      padding: 5px 10px;
      border: none;
      border-radius: 3px;
    }

    .btn-eliminar {
      background: #500;
      color: white;
    }
  `]
})
export class AppComponent {
  pacientes: Paciente[] = [
    { id: 1, nombre: 'Marcus Fenix', infeccion: 15, estado: 'estable' },
    { id: 2, nombre: 'Sarah Connor', infeccion: 85, estado: 'critico' },
    { id: 3, nombre: 'Ellen Ripley', infeccion: 0, estado: 'estable' }
  ];

  administrarCura(p: Paciente) {
    if (p.infeccion > 0) p.infeccion -= 10;
    if (p.infeccion < 0) p.infeccion = 0;
    this.actualizarEstado(p);
  }

  darDeBaja(id: number) {
    this.pacientes = this.pacientes.filter(p => p.id !== id);
  }

  private actualizarEstado(p: Paciente) {
    if (p.infeccion > 70) p.estado = 'critico';
    else p.estado = 'estable';
  }
}
