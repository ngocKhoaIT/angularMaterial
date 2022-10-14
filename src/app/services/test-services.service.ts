import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class TestServicesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllOrganizations(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.baseApiUrl + "/api/Organization/GetAll")
  }

  addOrganization(addOrganizationRequest: Organization):Observable<Organization>{
    return this.http.post<Organization>(this.baseApiUrl + '/api/Organization/AddOrganization', 
    addOrganizationRequest);
  }

  getIdOrganization(id:number): Observable<Organization>{
    return this.http.get<Organization>(this.baseApiUrl + '/api/Organization/Get/'+id)
  }


}
