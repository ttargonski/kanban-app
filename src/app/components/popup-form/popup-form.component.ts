import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss'],
})
export class PopupFormComponent {
  @Input() headerName: string = '';
  @Input() buttonName: string = '';
  inputText: string = '';

  @Output() onAdd: EventEmitter<string> = new EventEmitter();
  @Output() onClose = new EventEmitter();

  onSubmit() {
    if (this.inputText !== '') {
      this.onAdd.emit(this.inputText);
      this.inputText = '';
      this.buttonName = '';
      this.headerName = '';
    }
  }

  close() {
    this.inputText = '';
    this.buttonName = '';
    this.headerName = '';
    this.onClose.emit();
  }
}
