import { DetailsComponent } from './../../componente/details/details.component';
import { Livro } from './../../models/livro';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmprestimosService } from './../../service/emprestimos.service';
import { Emprestimo } from './../../models/emprestimo';
import { NotificationService } from 'src/app/service/notification.service';
import { LivrosService } from 'src/app/service/livros.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['leitor', 'livro', 'dataEmprestimo', 'status', 'excluir', 'editar', 'capa'];
  dataSource: Emprestimo[] = [];
  

  constructor(
    private emprestimoService: EmprestimosService,
    private notification: NotificationService,
    private dialog: MatDialog,
    private listaLivrosService: LivrosService
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

  public deleteEmprestimo(id: string, livro: Livro): void {
    this.listaLivrosService.livrosDisponiveis(livro).subscribe()
    this.emprestimoService.deleteEmprestimo(id).subscribe(response => {
      this.notification.Showmessage ("Emprestimo apagado");
      this.initializeTable();
    });
  }

  public openDetails(emprestimo: Emprestimo): void {
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: emprestimo.livro
      
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
