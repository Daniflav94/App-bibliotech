import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private snackbar:MatSnackBar) { }

  Showmessage(message:string){
    this.snackbar.open(message,'fechar',{
      duration:3000,
      horizontalPosition:'left',
      verticalPosition:"top",
      
    })
  }
}
