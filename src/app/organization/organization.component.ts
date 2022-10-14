import {Component, OnInit, AfterViewInit, ViewChild, Input, Inject} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Organization } from '../models/organization.model';
import { TestServicesService } from '../services/test-services.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'; 
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})

export class OrganizationComponent implements OnInit{

  displayedColumns: string[] = ['OrganizationId', 'OrganizationName', 'OrganizationLevel',
                                'abbreviation', 'belongtoUnit', 'amount', 'personInCharge', 
                                'date_create', 'date_update', 'system'];
                                
  dataSource = new MatTableDataSource<Organization>;

  addOrganizationRequest: Organization = {
    OrganizationId: 0,
    OrganizationName: '',
    OrganizationLevel: '',
    abbreviation: '',
    belongtoUnit: '',
    amount: 0,
    personInCharge: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  organizations: Organization[] = [];

  constructor(private testService: TestServicesService, private router: Router,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.testService.getAllOrganizations()
    .subscribe({
      next: (organizations)=>{
        this.organizations = organizations;
        this.dataSource = new MatTableDataSource(organizations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  today= new Date();

  addOrganization(event: Event){
    this.addOrganizationRequest.amount = 0;
    this.addOrganizationRequest._status = 0;
    this.addOrganizationRequest.OrganizationId = 0;
    this.addOrganizationRequest.date_create = '2022-10-11T07:40:25.49';
    this.addOrganizationRequest.date_update = '2022-10-11T07:40:25.49';
    this.testService.addOrganization(this.addOrganizationRequest)
    .subscribe({
      next: (og) => {
        this.router.navigate(['organizations']);
      }
    })
  }

redirectToUpdate(id: string) : void{
  const dialogRef = this.dialog.open(popEditOrganization, {
    width: '1000px',
    height: '500px',
    data: this.addOrganizationRequest.OrganizationId,
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

@Component({
  selector: 'popEditOrganization',
  templateUrl: 'popEditOrganization.html',
})
export class popEditOrganization implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<popEditOrganization>,
    @Inject(MAT_DIALOG_DATA) public data: Organization,
    private testService: TestServicesService,
  ) {}
  ngOnInit(): void {
    const id = this.data.OrganizationId;

    if(id){
      this.testService.getIdOrganization(id)
      .subscribe({next: (response) => { 
        this.OrganizationDetails = response;
      }}
      )
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  OrganizationDetails: Organization = {
    OrganizationId: 0,
    OrganizationName: '',
    OrganizationLevel: '',
    abbreviation: '',
    belongtoUnit: '',
    amount: 0,
    personInCharge: '',
    _status: 0,
    date_create: '',
    date_update: '',
  }

  editOrganization(event: Event){

  }

}
