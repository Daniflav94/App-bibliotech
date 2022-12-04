import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
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
  campoLivro = new FormControl('')
  livro!: Livro
  filteredOptions!: Observable<Livro[]>

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
      //livro: ['', [Validators.required]]
    }) 

  }  

  ngOnInit(): void {
    this.listarLivrosDisponiveis()
    this.filteredOptions = this.campoLivro.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): Livro[] {
    const filterValue = value.toLowerCase();

    return this.listaLivros.filter(value => value.titulo.toLowerCase().includes(filterValue));
  }

  livroSelecionado(livro: Livro) {
    this.livro = livro
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
      emprestimo.livro = this.livro
      const idlivro = this.livro.id
      const dataMiliSegundos = Date.now()
      const dataAtual = new Date(dataMiliSegundos)
      emprestimo.dataEmprestimo = dataAtual.toLocaleDateString()
      emprestimo.status = "pendente"
      this.emprestimoService.criarEmprestimo(emprestimo).subscribe(
        (resposta) => {
          this.notificacao.Showmessage("Novo empréstimo cadastrado!")
          this.router.navigate(['/dashboard'])        
        }
      )
      this.listaLivrosService.emprestarLivro(idlivro)
      
    } else {
      this.notificacao.Showmessage("Verifique os campos preenchidos e tente novamente.")
    }
  }

}
