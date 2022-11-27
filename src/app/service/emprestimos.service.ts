import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  public criarEmprestimo(emprestimo: Emprestimo): Observable<any> {
    const promise = this.firestore.collection("emprestimos").add(emprestimo)
    return from(promise)
  }
}
