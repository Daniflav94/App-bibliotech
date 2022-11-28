import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  displayedColumns = ['titulo', 'categoria', 'autor', 'isbn', 'excluir'];
  dataSource = [];

  constructor() { }

  ngOnInit(): void {
  }

}
