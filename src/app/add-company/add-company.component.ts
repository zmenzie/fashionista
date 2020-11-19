import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  formData: any = {};
  errors: any = [];

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
  }

  addCompany(): void {
    console.log(this.formData);
    this.errors = [];
    this.companyService.addCompany(this.formData)
      .subscribe(() => {
        this.router.navigate(['/companies-list'], { queryParams: { added: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }

}
