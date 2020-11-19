import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  formData: any = {};
  errors: any = [];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    //console.log(this.formData);
    this.errors = [];
    this.auth.register(this.formData)
      .subscribe(() => {
        this.router.navigate(['/users-list'], { queryParams: { registered: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }
}
