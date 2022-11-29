import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emprestimo } from 'src/app/models/emprestimo';
import { Livro } from 'src/app/models/livro';
import { EmprestimosService } from 'src/app/service/emprestimos.service';
import { LivrosService } from 'src/app/service/livros.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-novo-emprestimo',
  templateUrl: './novo-emprestimo.component.html',
  styleUrls: ['./novo-emprestimo.component.css']
})
export class NovoEmprestimoComponent implements OnInit {

  public formEmprestimo: FormGroup
  public listaLivros: Livro[] = []
  public idLivro: string = ''

  constructor(
    fb: FormBuilder,
    private emprestimoService: EmprestimosService,
    private notificacao: NotificationService,
    private router: Router,
    private listaLivrosService: LivrosService
  ) {
    this.formEmprestimo = fb.group({
      leitor: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      status: ['', [Validators.required]],
      livro: [{}, [Validators.required]]
    }) 

  }  

  ngOnInit(): void {
    this.listarLivrosDisponiveis()
  }

  public listarLivrosDisponiveis(): void{
    this.listaLivrosService.listarLivrosDisponiveis().subscribe(
      (resposta) => {
        this.listaLivros = resposta
      }
    )
  }

  public criarEmprestimo(): void{
    if(this.formEmprestimo.valid){
      const emprestimo: Emprestimo = this.formEmprestimo.value
      const idLivro = emprestimo.livro.id
      const dataMiliSegundos = Date.now()
      const dataAtual = new Date(dataMiliSegundos)
      emprestimo.dataEmprestimo = dataAtual.toLocaleDateString()
      this.emprestimoService.criarEmprestimo(emprestimo).subscribe(
        (resposta) => {
          this.notificacao.Showmessage("Novo empréstimo cadastrado!")
          this.router.navigate(['/dashboard'])        
        }
      )
      this.listaLivrosService.emprestarLivro(idLivro)
      
    } else {
      this.notificacao.Showmessage("Verifique os campos preenchidos e tente novamente.")
    }
  }

}
