import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private autenticacao:AngularFireAuth,
    private notificacao:NotificationService,
    private roter:Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return this.autenticacao.authState.pipe(
      map(user =>{
        if(user){
          return true;
        }else{
          this.notificacao.Showmessage("erro ao direcionar, login necessario")
          this.roter.navigate(["/login"])
          return false
        }
      })
    )
  }
  
}
