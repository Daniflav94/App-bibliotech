import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Livro } from './../models/livro';
import { NotificationService } from './notification.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import {   EMPTY, from,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

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

}
