import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Output() addTask = new EventEmitter<Task>();
  tasks: Task[] = [];
  newTask: Task = {} as Task;
  lastId: number = 0; 

  ngOnInit() {
    this.loadTasksFromLocal();
    this.updateLastId();
  }

  private loadTasksFromLocal() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  private updateLastId() {
    if (this.tasks.length > 0) {
      this.lastId = Math.max(...this.tasks.map(task => task.id));
    }
  }

  submitTask() {
    if (!this.newTask.name) {
      alert('Task name cannot be empty!');
      return;
    }

    this.newTask.id = ++this.lastId;
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
