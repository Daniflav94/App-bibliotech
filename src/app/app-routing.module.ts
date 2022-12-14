import { AuthGuard } from './guards/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent  } from './views/login/login.component';
import { NovoCadastroComponent } from './views/novo-cadastro/novo-cadastro.component';
import { NovoEmprestimoComponent } from './views/novo-emprestimo/novo-emprestimo.component';
import { EditarEmprestimoComponent } from './views/editar-emprestimo/editar-emprestimo.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LivrosComponent } from './views/livros/livros.component';
import { AdicionarLivroComponent } from './views/adicionar-livro/adicionar-livro.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: "Home | Bibliotech"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Bibliotech"
  },
  {
    path: 'cadastrar',
    component: NovoCadastroComponent,
    title: "Cadastrar | Bibliotech"
  },
  {
    path: 'emprestar',
    component: NovoEmprestimoComponent,
    canActivate:[AuthGuard],
    title: "Emprestar | Bibliotech"
  },
  {
    path: 'editar/:id',
    component: EditarEmprestimoComponent,
    canActivate:[AuthGuard],
    title: "Editar | Bibliotech"
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate:[AuthGuard],
    title: "Dashboard | Bibliotech"
  },
  {
    path: "livros",
    component: LivrosComponent,
    canActivate:[AuthGuard],
    title: "Livros | Bibliotech"
  },
  {
    path: "livros/adicionar-livro",
    component: AdicionarLivroComponent,
     canActivate:[AuthGuard],
    title: "Novo Livro | Bibliotech"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
