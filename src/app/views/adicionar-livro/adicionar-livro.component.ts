import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-livro',
  templateUrl: './adicionar-livro.component.html',
  styleUrls: ['./adicionar-livro.component.css']
})
export class AdicionarLivroComponent implements OnInit {

  constructor(
    fb: FormBuilder
  ) {
    this.formLivro = fb.group({
      titulo: ['', [Validators.required]],
      categoria: ['', [Validators.required, Validators.email]],
      capa: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      isbn: ['', [Validators.required]]
    }) 
   }

  public formLivro: FormGroup
  ngOnInit(): void {
  }

}
