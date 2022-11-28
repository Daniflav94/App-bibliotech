import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { LivrosService } from 'src/app/service/livros.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-adicionar-livro',
  templateUrl: './adicionar-livro.component.html',
  styleUrls: ['./adicionar-livro.component.css']
})

export class AdicionarLivroComponent implements OnInit {

  constructor(
    fb: FormBuilder,
    private livrosService: LivrosService,
    private notificacao: NotificationService,
    private router: Router
  ) {
    this.formLivro = fb.group({
      titulo: ['', [Validators.required]],
      categoria: ['', [Validators.required, Validators.email]],
      capa: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      isbn: ['', [Validators.required]]
    }) 
   }

  public formLivro: FormGroup
  ngOnInit(): void {
  }

  public criarNovoLivro(): void{
    if(this.formLivro.valid){
      const livro: Livro = this.formLivro.value
      this.livrosService.criarListaDeLivros(livro).subscribe(
        (resposta) => {
          this.notificacao.Showmessage("Livro inserido no acervo com sucesso!")
          this.router.navigate(["/livros"])
        }
      )
    }
  }

}
