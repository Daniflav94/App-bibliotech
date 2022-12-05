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
  public myControl = new FormControl<string | Livro>('');
  public listaLivros: Livro[] = []
  public filteredOptions!: Observable<Livro[]>;
  public livroSelecionado!: Livro

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
    }) 

  }  

  ngOnInit(): void {
    this.listarLivrosDisponiveis()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.titulo;
        return name ? this._filter(name as string) : this.listaLivros.slice();
      }),
    );
  }

  public salvarLivro(livro: Livro){
    this.livroSelecionado = livro
  }

  displayFn(livro: Livro): string {
    return livro && livro.titulo ? livro.titulo : '';
  }

  private _filter(name: string): Livro[] {
    const filterValue = name.toLowerCase();

    return this.listaLivros.filter(option => option.titulo.toLowerCase().includes(filterValue));
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
      emprestimo.livro = this.livroSelecionado
      const idLivro = this.livroSelecionado.id
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
      this.listaLivrosService.emprestarLivro(idLivro)
      
    } else {
      this.notificacao.Showmessage("Verifique os campos preenchidos e tente novamente.")
    }
  }

}
