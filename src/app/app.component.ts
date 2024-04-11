import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, TaskListComponent, TaskFormComponent, TabComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: Task[] = []; 
  activeTab: string = 'Add Task';

  onTabChange(tabName: string) {
    this.activeTab = tabName;
  }
  
  addTaskHandler(newTask: Task) {
    this.tasks.push(newTask); 
  }

}
