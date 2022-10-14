import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'organization'},
  {path: 'home', component:HomeComponent},
  {path: 'organization', component:OrganizationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
