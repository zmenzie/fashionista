import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { ServicesComponent } from './services/services.component';

import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

// AuthGuard Enforced HERE: Controls what type of user can access what page.

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users-list', component: UsersListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'companies-list', component: CompaniesListComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'edit-company', component: EditCompanyComponent },
  { path: 'products', component: ProductComponent },
  { path: 'products-list', component: ProductsListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product', component: EditProductComponent },
	{ path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
