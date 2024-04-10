import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() addTask = new EventEmitter<Task>();
  tasks: Task[] = [];
  newTask: Task = {} as Task;

  submitTask() {
    this.addTask.emit(this.newTask); 
    this.tasks.push(this.newTask);   
    this.saveTaskToLocal(this.newTask);
    this.newTask = {} as Task;
  }

  private saveTaskToLocal(task: Task) {
    const storedTasks = localStorage.getItem('tasks');
    let tasks: Task[] = [];
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
