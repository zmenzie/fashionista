import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  formData: any = {};
  errors: any = [];

  _id: string;
  name: string;

  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this._id = params['_id'];
      this.name = params['name'];
    })
  }

  ngOnInit(): void {
  }

  updateCompany(): void {
    this.formData = {
      _id: this._id,
      name: this.name
    }

    this.companyService.updateCompany(this.formData)
      .subscribe(() => {
        this.router.navigate(['/companies-list'], { queryParams: { registered: 'success' } });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }


  deleteCompany(): void {
    console.log(this._id);
    this.companyService.deleteCompany(this._id)
    .subscribe(() => {
      this.router.navigate(['/companies-list'], { queryParams: { registered: 'success' } });
    },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
  }

}
