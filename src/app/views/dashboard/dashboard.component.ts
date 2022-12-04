import { DetailsComponent } from './../../componente/details/details.component';
import { Livro } from './../../models/livro';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmprestimosService } from './../../service/emprestimos.service';
import { Emprestimo } from './../../models/emprestimo';
import { NotificationService } from 'src/app/service/notification.service';
import { LivrosService } from 'src/app/service/livros.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['leitor', 'livro', 'dataEmprestimo', 'status', 'excluir', 'editar', 'capa'];
  dataSource: Emprestimo[] = [];
  disableSelect = new FormControl(false);
  corStatus: string = 'red'

  constructor(
    private emprestimoService: EmprestimosService,
    private notification: NotificationService,
    private dialog: MatDialog,
    private livrosService: LivrosService
  ) { }

  ngOnInit(): void {
    this.initializeTable();

  }

  private initializeTable(): void {
    this.emprestimoService.findAll().subscribe(emprestimo => {
      this.dataSource = emprestimo;

      console.log(emprestimo)
    });
  }

  public deleteEmprestimo(id: string, livro: Livro, status: string): void {
   if(status === 'pendente'){
    this.livrosService.livrosDisponiveis(livro)
    this.emprestimoService.deleteEmprestimo(id).subscribe(response => {
      this.notification.Showmessage("Emprestimo apagado");
      this.initializeTable();
    });
    }else if (status === 'devolvido'){
      this.emprestimoService.deleteEmprestimo(id).subscribe(response => {
        this.notification.Showmessage("Emprestimo apagado");
        this.initializeTable();
      });
    }
  }

  public openDetails(emprestimo: Emprestimo): void {
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: emprestimo.livro

    });
  }

  public statusAlterado(idEmprestimo: string): void {
    this.dataSource.forEach(emp => {
      const emprestimo: Emprestimo = emp
      if (emprestimo.id == idEmprestimo) {
       emprestimo.status = "devolvido"
       this.livrosService.livrosDisponiveis(emprestimo.livro)
        this.emprestimoService.editarEmprestimo(emprestimo).subscribe(
          () => {
            this.notification.Showmessage("Status alterado para devolvido.")
          }
        )        
      }
    });
  }


  // DIALOG

  /*  public openDetails(emprestimo: Emprestimo): void {
     this.dialog.open(DetailsComponent, {
       width: "400px",
       data: emprestimo
     });
   } */
}
