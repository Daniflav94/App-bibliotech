import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.css']
})
export class NovoCadastroComponent implements OnInit {
credenciais!:FormGroup
  constructor(
    private router:Router,
    private fb :FormBuilder,
    private autenticacao:AuthService,
    private notificacao:NotificationService 
    ) { 
this.credenciais = fb.group({
  email:["",[Validators.required, Validators.email]],
  senha:["",[Validators.required, Validators.minLength(6)]],

})
    }

  ngOnInit(): void {
  }
//Entrar pelo google
   public loginPeloGoogle(){
    this.autenticacao.LoginPeloGoogle().subscribe(
      (credentials)=>{
        this.notificacao.Showmessage("Bem vindo(a)")
        this.router.navigate(["/login"])

    }
   )
}
//criação de novo usuario
  public createNewUser(){
    if(this.credenciais.valid){
    const user:User = this.credenciais.value
    this.autenticacao.createNewUserWithEmailAndSenha(user).subscribe((credencials)=>{
      this.notificacao.Showmessage("Usuario cadastrado com sucesso")
      console.log(user)
      this.router.navigate(["/login"])


    })
  }else{
    this.notificacao.Showmessage("Email /ou Senha invalidos")
  }
  }
}
