import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paciente } from './interfaces/interfaces.components';
import { PacienteCard } from './paciente-card/paciente-card';
import { PatientService } from './service/patient-service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PacienteCard],
  template: `
    <div class="enfermeria-container">
      <h1>🏥 Z-0: MONITOR DE BIO-SEÑALES</h1>

      <div class="grid-pacientes">
        @for (paciente of patient$|async; track paciente.id) {
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
  
  private patientService = inject(PatientService);
  patient$ = this.patientService.getPatient();

  administrarCura(p: Paciente) {
    // if (p.infeccion > 0) p.infeccion -= 10;
    // if (p.infeccion < 0) p.infeccion = 0;
    // this.actualizarEstado(p);
    this.patientService.curar(p.id);
  }

  darDeBaja(id: number) {
    this.patientService.baja(id);
  }

  private actualizarEstado(p: Paciente) {
    // if (p.infeccion > 70) p.estado = 'critico';
    // else p.estado = 'estable';
    this.patientService.updateEstado(p);
  }
}
