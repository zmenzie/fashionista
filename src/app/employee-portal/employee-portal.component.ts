import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-employee-portal',
  templateUrl: './employee-portal.component.html',
  styleUrls: ['./employee-portal.component.css']
})
export class EmployeePortalComponent implements OnInit {

  formData: any = {};
  errors: any = [];



  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    console.log(JSON.stringify(this.formData));
    this.formData.type = "employee";
    console.log(JSON.stringify(this.formData));

    this.errors = [];
    this.auth.register(this.formData)
      .subscribe(() => {
        this.router.navigate(['/auth/login'], { queryParams: { registered: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }
}
