import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from "../models/company";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // URL to web api
  private companyUrl = 'http://localhost:5000/api/companies';
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    const URI = this.companyUrl + '/companyFromDb';
    return this.http.get<Company[]>(URI);
  }

  getCompanyById(id: any): Observable<Company> {
    return this.http.get<Company>(`${this.companyUrl}/${id}`);
  }

  addCompany(companyData: any): Observable<any> {
    const URI = this.companyUrl + '/addCompany';
    return this.http.post(URI, companyData);
  }

  updateCompanyById(company: Company, id: any): Observable<Company> {
    return this.http.put<Company>(`${this.companyUrl}/${id}`, company, httpOptions);
  }

  deleteCompanyById(id: any): Observable<Company> {
    return this.http.delete<Company>(`${this.companyUrl}/${id}`);
  }

}