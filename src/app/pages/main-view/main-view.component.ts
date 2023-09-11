import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { Board } from 'src/app/models/board.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardsService } from 'src/app/services/boards.service';
import { Column } from 'src/app/models/column.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  board: Board = {
    id: '',
    name: '',
    columns: [],
    uid: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        let id = params.get('id');
        if (id) {
          //this.boardsService.getAllBoards();
          this.board = this.boardsService.getBoard(id);

          if (this.board.id === '') {
            // not found page
            this.router.navigate(['']);
          }
        }
      },
    });
  }

  saveBoard() {
    this.boardsService.updateBoard(this.board);
  }

  renameBoard(newBoardName: string) {
    this.board.name = newBoardName;
    this.saveBoard();
  }

  removeBoard() {
    this.boardsService.deleteBoard(this.board.id);
    this.router.navigate(['boards']);
  }

  addColumn(name: string) {
    const column: Column = {
      id: uuidv4(),
      name: name,
      tasks: [],
    };
    this.board.columns.push(column);
    this.saveBoard();
  }
}
