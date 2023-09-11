import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { DataService } from './data.service';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards: Board[] = [];

  constructor(private fireData: DataService, private auth: AuthService) {}

  // localstorage

  getLocalStorage() {
    let retString = localStorage.getItem('boards');
    if (retString) {
      let boards = JSON.parse(retString);
      this.boards = boards;
      return boards;
    }
  }

  saveLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.boards));
  }

  // boards crud

  getAllBoards(): Board[] {
    //const user = JSON.parse(localStorage.getItem('user')!);
    this.fireData.getBoards(this.auth.getUserId());
    return this.getLocalStorage();
  }

  getBoard(id: string): Board {
    const board = this.boards.find((board) => board.id === id);
    if (board) {
      return board;
    } else {
      return {
        id: '',
        name: '',
        columns: [],
        uid: '',
      };
    }
  }

  addBoard(board: Board) {
    this.boards.push(board);
    //firebase
    this.fireData.createBoard(board.id, board);
    this.saveLocalStorage();
  }

  deleteBoard(id: string) {
    const boardWithIdIndex = this.boards.findIndex((board) => board.id === id);

    if (boardWithIdIndex > -1) {
      this.boards.splice(boardWithIdIndex, 1);
      //firebase
      this.fireData.deleteBoard(id);
      this.saveLocalStorage();
    }
  }

  updateBoard(updatedBoard: Board) {
    const board = this.boards.find((board) => board.id === updatedBoard.id);
    if (board) {
      board.name = updatedBoard.name;
      board.columns = updatedBoard.columns;
      //firebase
      this.fireData
        .updateBoard(board.id, board)
        .then(() => {
          console.log('Board was updated succesfully.');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      this.saveLocalStorage();
    }
  }
}
