import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
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

  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.log('Form submitted:', this.employee);
    // Here you can add the logic to send the employee data to the server
    this.employeeService.createEmploye(this.employee).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },

      error: (error) => {
        console.error(error);
        this.errorMessage = `Error occured(${error.status})`;
      },
    });
  }
}
