import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  @Input('form') empForm!: FormGroup;
  @Input('empList')  empList: any[] = [];
  @Input('country')  countryList:any[]=[];
  @Input('selectedEmpId') selectedEmpId: number | null = null;
  constructor() {}

  ngOnInit(): void {
  }

}
