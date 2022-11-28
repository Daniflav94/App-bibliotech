import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NovoEmprestimoComponent } from './views/novo-emprestimo/novo-emprestimo.component';
import { HeaderComponent } from './componente/header/header.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarEmprestimoComponent } from './views/editar-emprestimo/editar-emprestimo.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NovoCadastroComponent } from './views/novo-cadastro/novo-cadastro.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LivrosComponent } from './views/livros/livros.component';
import { AdicionarLivroComponent } from './views/adicionar-livro/adicionar-livro.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NovoEmprestimoComponent,
    EditarEmprestimoComponent,
    DashboardComponent,
    NovoCadastroComponent,
    LivrosComponent,
    AdicionarLivroComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
