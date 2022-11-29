import { User } from 'src/app/models/user';
import { Observable,from, catchError, EMPTY, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private Autenticacao: AngularFireAuth,
     private notificacao:NotificationService
     ) 
     { }

//Login pelo google
  public LoginPeloGoogle():Observable<any>{
    const provider = new GoogleAuthProvider();
    const promise = this.Autenticacao.signInWithPopup(provider);
    return from(promise).pipe(
      catchError(error =>{
        this.notificacao.Showmessage("Erro ao autenticar pelo google, tente novamente")
        console.error(error)
        return EMPTY
      })
    );


  }
  //função de autenticação por login e senha 
  createNewUserWithEmailAndSenha(user:User) {
    const promise = this.Autenticacao.createUserWithEmailAndPassword(user.email,user.senha)
    return from(promise).pipe(
      catchError((erro)=>{
        this.notificacao.Showmessage("Não foi possivel cadastrar o usuário, tente novamente")
        console.log(erro)
        return EMPTY
      
      })
    )
  }

  public  LoginEmailAndSenha(user:User):Observable<any> {
    
    const promise = this.Autenticacao.signInWithEmailAndPassword(user.email,user.senha)
    return from(promise).pipe(
      catchError(error => {
        if(error.code == "auth/user-not-found"){
          this.notificacao.Showmessage("Usuário não cadastrado.");
        }
        else if(error.code == "auth/wrong-password") {
          this.notificacao.Showmessage("Senha incorreta.");
        }
        else {
          this.notificacao.Showmessage("Erro ao autenticar.");
          console.error(error);
        }
        return EMPTY;
      })
    )
    }
    logout() {
      const promise = this.Autenticacao.signOut();
      return from(promise);
    }
    isAuthenticated():Observable<any>{
      return this.Autenticacao.authState.pipe(
        tap((user)=>{
           console.log(user)
        })
      )
    }
  }

  
 

