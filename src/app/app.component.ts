import { Component } from '@angular/core';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
//import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule , TaskListComponent, TaskFormComponent],
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: Task[] = []; // Array to hold tasks
  
  addTaskHandler(newTask: Task) {
    this.tasks.push(newTask); // Add new task to the tasks array
  }

}
