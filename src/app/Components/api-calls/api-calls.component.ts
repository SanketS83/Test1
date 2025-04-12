import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api-calls',
  templateUrl: './api-calls.component.html',
  styleUrls: ['./api-calls.component.css']
})
export class ApiCallsComponent implements OnInit {
  empForm!: FormGroup;
  empList: any[] = [];
  countryList:any[]=[];
  selectedEmpId: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.empForm = this.fb.group({
      name: new FormControl('',[Validators.required]) ,
      emailId: new FormControl('',[Validators.email,Validators.required]) ,
      mobile: new FormControl('',[Validators.maxLength(10),Validators.minLength(10)]) ,
      country:new FormControl('') ,
      state:new FormControl('',[Validators.required]) ,
      district:new FormControl('',[Validators.required]) ,
    });

    this.getAllEmployee();
    this.getCountries();
  }
  getAllEmployee(){
    this.http.get("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee").subscribe((res:any)=>{
      
      this.empList=res;
    })
  }
getCountries(){
  this.http.get("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country").subscribe((res:any)=>{
  
    this.countryList=res;
  })
}

  saveUser() {
    if (this.selectedEmpId) {
      // PUT (Update)
      this.http.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${this.selectedEmpId}`, this.empForm.value)
        .subscribe(() => {
          alert('Employee updated!');
          this.getAllEmployee();
          this.resetForm();
        });
    } else {
      // POST (Create)
      this.http.post('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee', this.empForm.value)
        .subscribe(() => {
          alert('Employee added!');
          this.getAllEmployee();
          this.resetForm();
        });
    }
  }

  editEmp(emp: any) {
    this.selectedEmpId = emp.id;
    this.empForm.patchValue(emp);
  }

  deleteEmp(id: number) {
    if (confirm('Are you sure?')) {
      this.http.delete(`https://669b3f09276e45187d34e.mockapi.io/api/v1/employee/${id}`)
        .subscribe(() => {
          alert('User deleted!');
          this.getAllEmployee();
          this.resetForm();
        });
    }
  }

  resetForm() {
    this.empForm.reset();
    this.selectedEmpId = null;
  }


}
