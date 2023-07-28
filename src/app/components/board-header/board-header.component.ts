import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent {
  @Input() boardName: string = '';
  @Output() onAddColumn: EventEmitter<string> = new EventEmitter();
  @Output() onRenameBoard: EventEmitter<string> = new EventEmitter();
  @Output() onRemoveBoard = new EventEmitter();
  formOpen: string = '';

  toggleForm(name: string): void {
    if (this.formOpen === name) {
      this.formOpen = '';
    } else {
      this.formOpen = name;
    }
  }

  addColumn(columnName: string) {
    this.onAddColumn.emit(columnName);
    this.toggleForm('');
  }

  renameBoard(columnName: string) {
    this.onRenameBoard.emit(columnName);
    this.toggleForm('');
  }

  removeBoard() {
    this.onRemoveBoard.emit();
    this.toggleForm('');
  }
}
