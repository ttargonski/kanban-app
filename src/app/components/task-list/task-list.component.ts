import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  constructor() {}

  @Input() tasks: Task[] = [];
  @Output() saveTask = new EventEmitter();

  onDelete(id: string) {
    const colWithIdIndex = this.tasks.findIndex((task) => task.id === id);

    if (colWithIdIndex > -1) {
      this.tasks.splice(colWithIdIndex, 1);
    }
    this.saveTask.emit();
  }
}
