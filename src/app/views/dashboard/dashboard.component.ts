import { DetailsComponent } from './../../components/details/details.component';
import { NotificationService } from './../../services/notification.service';
import { CollaboratorService } from './../../services/collaborator.service';


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Emprestimo } from './src/app/models/emprestimo';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['leitor', 'livro', 'dataEmprestimo', 'status', 'excluir', 'editar', 'capa'];
  dataSource:  = [];

  constructor() { /* TODO document why this constructor is empty */  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }

}

/* Fazer o método para listar os empréstimos no Service Empréstimos,
/*criar também o método de delete. Implementar todos os métodos no TS do Dashboard
*/


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['foto', 'nome', 'email', 'cpf', 'cargo', 'setor', 'excluir', 'editar', 'detalhes'];
  dataSource: Collaborator[] = [];

  constructor(
    private collaboratorService: CollaboratorService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    this.collaboratorService.findAll().subscribe(collaborators => {
      this.dataSource = collaborators;
    });
  }

  public deleteCollaborator(id: string): void {
    this.collaboratorService.deleteCollaborator(id).subscribe(response => {
      this.notification.showMessage("Apagado.");
      this.initializeTable();
    });
  }

  public openDetails(collaborator: Collaborator): void {
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: collaborator
    });
  }
}
