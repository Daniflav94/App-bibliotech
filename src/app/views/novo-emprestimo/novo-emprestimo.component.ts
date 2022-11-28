import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Emprestimo } from 'src/app/models/emprestimo';
import { EmprestimosService } from 'src/app/service/emprestimos.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-novo-emprestimo',
  templateUrl: './novo-emprestimo.component.html',
  styleUrls: ['./novo-emprestimo.component.css']
})
export class NovoEmprestimoComponent implements OnInit {

  public formEmprestimo: FormGroup

  constructor(
    fb: FormBuilder,
    private emprestimoService: EmprestimosService,
    private notificacao: NotificationService
  ) {
    this.formEmprestimo = fb.group({
      leitor: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      status: ['', [Validators.required]],
      livro: ['', [Validators.required]]
    }) 

  }  

  ngOnInit(): void {
  }

  public criarEmprestimo(): void{
    if(this.formEmprestimo.valid){
      const emprestimo: Emprestimo = this.formEmprestimo.value
      this.emprestimoService.criarEmprestimo(emprestimo).subscribe(
        (resposta) => {
          this.notificacao.Showmessage("Novo empréstimo cadastrado!")
          const dataMiliSegundos = Date.now()
          const dataAtual = new Date(dataMiliSegundos)
          emprestimo.dataEmprestimo = dataAtual.toLocaleDateString()
        }
      )
    } else {
      this.notificacao.Showmessage("Verifique os campos preenchidos e tente novamente.")
    }
  }

}
