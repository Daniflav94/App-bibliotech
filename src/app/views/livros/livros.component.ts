import { Router } from '@angular/router';
import { Livro } from './../../models/livro';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { LivrosService } from 'src/app/service/livros.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  newBook!:FormGroup
  constructor(
    private notificacao:NotificationService,
    private colecaoLivros:LivrosService,
    private roter:Router,
    private fb :FormBuilder
  ) { 
    this.newBook = fb.group({
     
      titulo:['',[Validators.required,Validators.maxLength(30)]],
      categoria:['',[Validators.required]],
      autor:['',[Validators.required]],
      isbn:['',[Validators.required]],
      capa:[''],
    })
  }
  displayedColumns = ['titulo', 'categoria', 'autor', 'isbn', 'excluir'];
  dataSource:Livro[] = [];



  ngOnInit(): void {
    this.initializerTable()
  }


private initializerTable(): void{
  this.colecaoLivros.findAll().subscribe(
    (livros)=>{
      this.dataSource = livros
    }
  )
}
excluirLivro(id:string){
this.colecaoLivros.deleteLivro(id).subscribe(
  (livro)=>{
    this.notificacao.Showmessage(`livro ${livro.titulo} excluido com sucesso`)
    this.initializerTable()
  }
)
}
}
