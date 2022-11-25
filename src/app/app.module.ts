import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { NovoCadastroComponent } from './views/novo-cadastro/novo-cadastro.component';
import { NovoEmprestimoComponent } from './views/novo-emprestimo/novo-emprestimo.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NovoCadastroComponent,
    NovoEmprestimoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }