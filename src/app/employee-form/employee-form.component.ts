import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../Models/employee';



@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: ''
  }

  onSubmit(): void {
    console.log('Form submitted:', this.employee);
    // Here you can add the logic to send the employee data to the server
  }


}
