import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, catchError, EMPTY, map } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {

  constructor(
    private firestore: AngularFirestore,
    private notificationService: NotificationService
  ) { }


  public criarEmprestimo(emprestimo: Emprestimo): Observable<any> {
    const promise = this.firestore.collection("emprestimos").add({
      uidUser:localStorage.getItem('uidUser'),
      ...emprestimo
    })
    return from(promise)
  }

  public editarEmprestimoById(id: string): Observable<any> {
    const promise = this.firestore.collection("emprestimo").doc(id).get()
    return from(promise).pipe(
      map(
        doc =>{
          const emprestimo: Emprestimo=doc.data() as Emprestimo;
        emprestimo.id = doc.id;
        return emprestimo;
      }),
      catchError(error => {
        this.notificationService.Showmessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
      )
    }

  public editarEmprestimo(emprestimo: Emprestimo){
    const promise = this.firestore.collection("emprestimos").doc(emprestimo.id).update(emprestimo)
    return from(promise).pipe(
      catchError(() => {
        this.notificationService.Showmessage("Error Edicao!")
        return EMPTY;
      })
      )
  }
}
