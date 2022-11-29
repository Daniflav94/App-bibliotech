import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notification: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService

  ) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }

  public logout(): void {
    this.authService.logout().subscribe(response => {
    this.notificationService.Showmessage("Até logo!");
    this.router.navigate(["/login"]);
    });
  }
}
