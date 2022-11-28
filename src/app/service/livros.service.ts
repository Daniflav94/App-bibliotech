import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Livro } from './../models/livro';
import { NotificationService } from './notification.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import {   EMPTY, from,  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor(
    private auth:AngularFireAuth,
    private firestore:AngularFirestore,
    private notificacao:NotificationService
    ) { }

    public criarListaDeLivros(livro:Livro):Observable<any>{

      const promise =this.firestore.collection("livros").add(livro)
      return from(promise).pipe(
        catchError((error)=>{
        this.notificacao.Showmessage("erro ao adicionar o livro")
        console.error(error)
        return EMPTY
        })
      );
    }
    public findAll(): Observable<any> {
      const promise = this.firestore.collection("livros").get();
      return from(promise).pipe(
        map((response: any) => {
          return response.docs.map((doc: any) => {
            const livro: Livro = doc.data() as Livro;
            livro.id = doc.id;
            return livro;
          })
        }),
        catchError(error => {
          this.notificacao.Showmessage("Erro ao buscar dados.");
          console.error(error);
          return EMPTY;
        })
      );
    }
    deleteLivro(id:string):Observable<any>{
      const promise = this.firestore.collection("livros").doc(id).delete()
      return from(promise).pipe(
        catchError(error=>{
          this.notificacao.Showmessage("erro ao excluir")
          console.error(error)
          return EMPTY
        })
      )
    }

}
