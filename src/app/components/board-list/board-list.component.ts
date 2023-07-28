import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardsService } from 'src/app/services/boards.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit {
  boardsList: Board[] = [];
  formOpen: boolean = false;

  constructor(private boardsService: BoardsService) {}

  toggleForm(): void {
    this.formOpen = !this.formOpen;
  }

  onSubmit(name: string) {
    const board: Board = {
      id: uuidv4(),
      name: name,
      columns: [],
    };
    this.boardsService.addBoard(board);
    this.toggleForm();
  }

  ngOnInit(): void {
    this.boardsService.getLocalStorage();
    this.boardsList = this.boardsService.getAllBoards();
  }

  drop(event: CdkDragDrop<Board>) {
    moveItemInArray(this.boardsList, event.previousIndex, event.currentIndex);
  }
}
