import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationService } from './notification.service';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage,
    private notification: NotificationService
    ) { }

  public uploadCapa(capa: File): Observable<any> {
    const promise = this.storage.upload(`fotos/${Date.now()}`, capa) //upload recebe endereço e arquivo como parametros
    return from(promise).pipe(
      catchError(error => {
        this.notification.Showmessage("Erro ao fazer upload.")
        console.error(error)
        return EMPTY
      })
    )
  }
}
