import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { EmprestimosService } from 'src/app/service/emprestimos.service';
import { LivrosService } from 'src/app/service/livros.service';
import { UploadService } from 'src/app/service/upload.service';
import { Emprestimo } from '../../models/emprestimo';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-editar-emprestimo',
  templateUrl: './editar-emprestimo.component.html',
  styleUrls: ['./editar-emprestimo.component.css']
})
export class EditarEmprestimoComponent implements OnInit {

  public emprestimo!: Emprestimo
  public listaLivros: Livro[] = []
  public livroAtual!: Livro
  public mudancaLivro: boolean = false
  public mudancaStatus: boolean = false

  constructor(
    private emprestimoService: EmprestimosService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
    private listaLivrosService: LivrosService

  ) { }
  ngOnInit(): void {
    this.inicializeArquivos()
    this.listarLivrosDisponiveis()
  }

  public listarLivrosDisponiveis(): void {
    this.listaLivrosService.listarLivrosDisponiveis().subscribe(
      (resposta) => {
        this.listaLivros = resposta
      }
    )
  }

  private inicializeArquivos(): void {
    const id = this.route.snapshot.params["id"]

    this.emprestimoService.editarEmprestimoById(id).subscribe(emprestimoRetornado => {
      this.emprestimo = emprestimoRetornado
      this.livroAtual = emprestimoRetornado.livro
    })
  }

  mudarStatus() {
    this.mudancaStatus = true
    if (this.emprestimo.status == "pendente") {
      this.emprestimo.status = "devolvido"
    } else if (this.emprestimo.status == "devolvido") {
      this.emprestimo.status = "pendente"
    }
  }

  mudarLivro(livroAlterado: Livro) {
    this.mudancaLivro = true
    this.emprestimo.livro = livroAlterado
  }

  public editarEmprestimo(form: NgForm): void {
    if (form.valid) {
      if (this.mudancaStatus == false && this.mudancaLivro == false) {
        this.emprestimoService.editarEmprestimo(this.emprestimo).subscribe(() => {
          this.notificationService.Showmessage("Emprestimo Editado.")
          this.router.navigate(["/dashboard"])
        })
      }else if (this.mudancaLivro == true && this.mudancaStatus == false) {
        this.listaLivrosService.livrosDisponiveis(this.livroAtual).subscribe()
        const idLivro = this.emprestimo.livro.id
        this.listaLivrosService.emprestarLivro(idLivro)
        this.emprestimoService.editarEmprestimo(this.emprestimo).subscribe(() => {
          this.notificationService.Showmessage("Emprestimo Editado.")
          this.router.navigate(["/dashboard"])
        })
      }else if (this.mudancaLivro == false && this.mudancaStatus == true && this.emprestimo.status == "devolvido") {
        this.listaLivrosService.livrosDisponiveis(this.emprestimo.livro).subscribe(
          (resposta) => {
            this.notificationService.Showmessage("Livro devolvido")
          }
        )
        this.emprestimoService.editarEmprestimo(this.emprestimo).subscribe(() => {
          this.notificationService.Showmessage("Emprestimo Editado.")
          this.router.navigate(["/dashboard"])
        })
      }          
    } else {
      this.notificationService.Showmessage("Nao conseguiu editar empréstimo.")
    }

  }
}