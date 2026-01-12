import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paciente } from '../interfaces/interfaces.components';

@Component({
  selector: 'app-paciente-card',
  imports: [],
  standalone: true,
  templateUrl: './paciente-card.html',
  styleUrl: './paciente-card.css',
})
export class PacienteCard {
  @Input() pacienteInfo !: Paciente;
  @Output() curarClick = new EventEmitter<Paciente>();
  @Output() bajaClick = new EventEmitter<number>();

  onClickCura(){
    this.curarClick.emit(this.pacienteInfo);
  }
  onBajaClick(){
    this.bajaClick.emit(this.pacienteInfo.id);
  }
}
