import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
  };

  isEditing: boolean = false;

  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}



  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {

      const id = result.get('id')

      if(id){
        // editing employee
        this.isEditing = true;
        
        this.employeeService.getEmployeesById(Number(id)).subscribe({
          next: (result) =>
            (this.employee = Array.isArray(result) ? result[0] : result),
          error: (err) =>
            (this.errorMessage = `Error occurred(${err.status})`),
        });
      }
    });
  }

  onSubmit(): void {

    if(this.isEditing){

      this.employeeService.editEmployee(this.employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },

        error: (error) => {
          console.error(error);
          this.errorMessage = `Error occurred during Update(${error.status})`;
        },
      });
      
    } else {
      // Creating a new employee
      this.employeeService.createEmployee(this.employee).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },

        error: (error) => {
          console.error(error);
          this.errorMessage = `Error occurred during Creating (${error.status})`;
        },
      });
    }



    
    
    
  }


}
