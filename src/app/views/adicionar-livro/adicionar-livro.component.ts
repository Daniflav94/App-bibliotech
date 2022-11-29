import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { LivrosService } from 'src/app/service/livros.service';
import { NotificationService } from 'src/app/service/notification.service';
<<<<<<< HEAD
=======
import { UploadService } from 'src/app/service/upload.service';
>>>>>>> main

@Component({
  selector: 'app-adicionar-livro',
  templateUrl: './adicionar-livro.component.html',
  styleUrls: ['./adicionar-livro.component.css']
})

export class AdicionarLivroComponent implements OnInit {
  

  constructor(
    fb: FormBuilder,
    private livrosService: LivrosService,
    private notificacao: NotificationService,
<<<<<<< HEAD
    private router: Router
=======
    private router: Router,
    private uploadService: UploadService
>>>>>>> main
  ) {
    this.formLivro = fb.group({
      titulo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
<<<<<<< HEAD
      capa: ['', [Validators.required]],
=======
      capa: [''],
>>>>>>> main
      autor: ['', [Validators.required]],
      isbn: ['', [Validators.required]]
    }) 
   }

  public formLivro: FormGroup
  isLoading: boolean = false
  capa: string = ''

  ngOnInit(): void {
  }

  public criarNovoLivro(): void{
    if(this.formLivro.valid){
      const livro: Livro = this.formLivro.value
      this.livrosService.criarListaDeLivros(livro).subscribe(
        (resposta) => {
          this.notificacao.Showmessage("Livro inserido no acervo com sucesso!")
          this.router.navigate(["/livros"])
        }
      )
<<<<<<< HEAD
    }
  }

=======
    }else {
      this.notificacao.Showmessage("Verifique os dados inseridos.")
    }
  }

  public uploadFile(event: any): void{
    this.isLoading = true // quando for chamada a função vai aparecer a barra de carregamento
    const file: File = event.target.files[0] // vai capturar o arquivo
    // FAZER UPLOAD DO ARQUIVO PARA O FIREBASE
    this.uploadService.uploadCapa(file).subscribe(resposta => {
      this.isLoading = false // nesse ponto do código a imagem já foi carregada, então a barra de progresso deverá sumir
      resposta.ref.getDownloadURL().then((capa: string) => {  // getDownloadUrl retorna uma promessa, then() pega o dado da promessa
        this.capa = capa
      })  
    })     
  }
  

>>>>>>> main
}
