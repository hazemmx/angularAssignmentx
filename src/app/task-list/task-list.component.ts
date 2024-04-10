import { Component, Input, Output, EventEmitter, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Output() addTask = new EventEmitter<Task>();
  isEditDialogOpen: boolean = false;
  editedTask: Task | null = null;
  constructor(private taskService: TaskService) { } 

  ngOnInit() {
    this.loadTasksFromLocal();
  }

  addTaskHandler(newTask: Task) {
    this.tasks.push(newTask);
    this.saveTasksToLocal();
  }

  markCompleted(index: number) {
    this.taskService.markCompleted(this.tasks[index]);
    this.saveTasksToLocal();
  }

  openEditDialog(task: Task) {
    this.editedTask = { ...task };
    this.isEditDialogOpen = true;
  }

  editTask() {
    if (this.editedTask !== null) {
      const index = this.tasks.findIndex(task => task.id === this.editedTask?.id); 
      if (index !== -1) {
        this.taskService.editTask(this.tasks, this.editedTask, index);
        this.closeEditDialog();
        this.saveTasksToLocal();
      }
    }
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(this.tasks, index);
    this.saveTasksToLocal();
  }

  getFormattedDueDate(task: Task) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(task.dueDate, 'shortDate');
  }

  closeEditDialog() {
    this.isEditDialogOpen = false;
    this.editedTask = null;
  }

  private loadTasksFromLocal() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  private saveTasksToLocal() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
