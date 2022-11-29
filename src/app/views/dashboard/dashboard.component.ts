import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmprestimosService } from './../../service/emprestimos.service';
import { Emprestimo } from './../../models/emprestimo';
import { NotificationService } from 'src/app/service/notification.service';

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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeTable();

  }

  private initializeTable(): void {
    this.emprestimoService.findAll().subscribe(emprestimo => {
      this.dataSource = emprestimo;
    });
  }

  public deleteEmprestimo(id: string): void {
    this.emprestimoService.deleteEmprestimo(id).subscribe(response => {
      this.notification.Showmessage ("Emprestimo apagado");
      this.initializeTable();
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
