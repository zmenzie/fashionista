import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formData: any = {};
  errors: any = [];

  // Current values of user
  _id: string;
  username: string;
  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this._id = params['_id'];
      this.username = params['username'];
      this.email = params['email'];
      this.password = params['password'];
      // console.log(this.username)
      // console.log(this.email)
    })
  }

  ngOnInit(): void {

  }

  updateUser(): void {
    this.formData = {
      _id: this._id,
      username: this.username,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.password
    }

    console.log(this.formData);
    // this.errors = [];

    this.auth.updateUser(this.formData)
      .subscribe(() => {
        this.router.navigate(['/users-list'], { queryParams: { registered: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }

  deleteUser(): void {
    console.log(this._id);
    // this.errors = [];

    this.auth.deleteUser(this._id)
      .subscribe(() => {
        this.router.navigate(['/users-list'], { queryParams: { registered: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });

  }

}
