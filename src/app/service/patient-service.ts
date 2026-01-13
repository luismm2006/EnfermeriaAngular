import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Paciente } from '../interfaces/interfaces.components';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private _patientSubject = new BehaviorSubject<Paciente[]>([
    { id: 1, nombre: 'Marcus Fenix', infeccion: 15, estado: 'estable' },
    { id: 2, nombre: 'Sarah Connor', infeccion: 85, estado: 'critico' },
    { id: 3, nombre: 'Ellen Ripley', infeccion: 0, estado: 'estable' }
  ]);

  getPatient(){
    return this._patientSubject.asObservable();
  }

  curar(id : number){
    const patient = this._patientSubject.value.map(p => {
      if(p.id === id){
        const nuevoValorInfeccion = p.infeccion > 9 ? p.infeccion - 10 : p.infeccion = 0;
        this.updateEstado(p);
        return {...p, infeccion: nuevoValorInfeccion}
      }
      return p;
    })
    this._patientSubject.next(patient);
  }

  baja(id:number){
    this._patientSubject.next(this._patientSubject.value.filter(p => p.id !== id));
  }

  updateEstado(p : Paciente){
    if (p.infeccion > 70) p.estado = 'critico';
    else p.estado = 'estable';
  }
}
