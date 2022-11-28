import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public credenciais!:FormGroup
  constructor(
   
    private router:Router,
    private fb :FormBuilder,
    private autenticacao:AuthService,
    private notificacao:NotificationService
    ) {
this.credenciais = this.fb.group({
  email:[ "" ,[Validators.required , Validators.email]],
  senha:["",[Validators.required, Validators.minLength(6)]]
})
     }

  ngOnInit(): void {
  }

  public loginPeloGoogle(){

    this.autenticacao.LoginPeloGoogle().subscribe(
      (credentials)=>{
        this.notificacao.Showmessage("Bem vindo(a)")
        this.router.navigate(["/login"])
      }
    )

  }
  public loginEmailAndSenha(){
    const user:User =this.credenciais.value
    this.autenticacao.LoginEmailAndSenha(user).subscribe(
      (credentials)=>{
        this.notificacao.Showmessage("Bem vinda(a)")
        this.router.navigate(["/login"])
        const usuario = credentials.user;
        localStorage.setItem("uidUser",usuario.uid)

         
      
        
      }
    )

  }
}
