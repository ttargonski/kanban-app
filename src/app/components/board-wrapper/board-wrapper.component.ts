import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Column } from 'src/app/models/column.model';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/models/task.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-board-wrapper',
  templateUrl: './board-wrapper.component.html',
  styleUrls: ['./board-wrapper.component.scss'],
})
export class BoardWrapperComponent {
  @Input() columns: Column[] = [];
  @Output() saveBoard = new EventEmitter();
  formOpen: string = '';
  columnId: string = '';

  constructor() {}

  toggleForm(colId: string, name: string): void {
    if (colId !== '') {
      this.columnId = colId;
    }
    if (this.formOpen === name) {
      this.formOpen = '';
    } else {
      this.formOpen = name;
    }
  }

  onSaveColumn() {
    this.saveBoard.emit();
  }

  // REMOVE COLUMN

  removeColumn(id: string) {
    const colWithIdIndex = this.columns.findIndex((col) => col.id === id);

    if (colWithIdIndex > -1) {
      this.columns.splice(colWithIdIndex, 1);
      this.onSaveColumn();
    }
  }

  // ADD TASKS

  saveTask(text: string) {
    const col = this.columns.find((col) => col.id === this.columnId);
    const task: Task = {
      id: uuidv4(),
      text: text,
    };
    col?.tasks.push(task);
    this.onSaveColumn();
    this.toggleForm('', '');
  }

  // RENAME COLUMN

  renameColumn(text: string) {
    const col = this.columns.find((col) => col.id === this.columnId);
    console.log(text, col);
    if (col) {
      col.name = text;
      this.onSaveColumn();
      this.toggleForm('', '');
    }
  }

  // MOVE TASKS

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.onSaveColumn();
  }
}
