import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor() {}

  boards: Board[] = [];

  // localstorage

  getLocalStorage() {
    let retString = localStorage.getItem('boards');
    if (retString) {
      let boards = JSON.parse(retString);
      this.boards = boards;
    }
  }

  saveLocalStorage() {
    localStorage.setItem('boards', JSON.stringify(this.boards));
  }

  // boards

  getAllBoards(): Board[] {
    return this.boards;
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
      };
    }
  }

  addBoard(board: Board) {
    this.boards.push(board);
    this.saveLocalStorage();
  }

  deleteBoard(id: string) {
    const boardWithIdIndex = this.boards.findIndex((board) => board.id === id);

    if (boardWithIdIndex > -1) {
      this.boards.splice(boardWithIdIndex, 1);
      this.saveLocalStorage();
    }
  }

  updateBoard(updatedBoard: Board) {
    const board = this.boards.find((board) => board.id === updatedBoard.id);
    if (board) {
      board.name = updatedBoard.name;
      board.columns = updatedBoard.columns;
      this.saveLocalStorage();
    }
  }
}
