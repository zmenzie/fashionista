import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
      this.authService.getUsers().subscribe(result => {
        this.users = result;
        console.log(this.users);
      })
  }

}
