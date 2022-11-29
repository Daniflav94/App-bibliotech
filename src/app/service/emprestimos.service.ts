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

  public findAll(): Observable<any> {
    const uidUser = localStorage.getItem('uidUser')
    const promise = this.firestore.collection("emprestimos",ref => ref.where('uidUser','==',uidUser)).get()
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const emprestimo: Emprestimo = doc.data() as Emprestimo;
          emprestimo.id = doc.id;
          return emprestimo;
        })
      }),
      catchError(error => {
        this.notificationService.Showmessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public editarEmprestimoById(id: string): Observable<any> {
    const promise = this.firestore.collection("emprestimos").doc(id).get()
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
        this.notificationService.Showmessage("Erro ao editar.")
        return EMPTY;
      })
      )
  }

  deleteEmprestimo(id:string):Observable<any>{
    const promise = this.firestore.collection("emprestimos").doc(id).delete()
    return from(promise).pipe(
      catchError(error=>{
        this.notificationService.Showmessage("Erro ao excluir empréstimo.")
        console.error(error)
        return EMPTY
      })
    )
  }

  
}
