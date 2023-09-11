import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dbPath = 'boards-collection';

  constructor(private firestore: AngularFirestore) {}

  getBoards(userId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.firestore
        .collection(this.dbPath, (ref) => ref.where('uid', '==', userId))
        .get()
        .subscribe((querySnapshot) => {
          const data: any[] = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });

          // Zapisz dane w localStorage
          localStorage.setItem('boards', JSON.stringify(data));
          resolve();
        }, reject);
    });
  }

  createBoard(customDocName: string, data: any): Promise<void> {
    const documentRef = this.firestore
      .collection(this.dbPath)
      .doc(customDocName);
    return documentRef.set(data);
  }

  updateBoard(docId: string, updatedData: any): Promise<void> {
    const documentRef = this.firestore.collection(this.dbPath).doc(docId);
    return documentRef.update(updatedData);
  }

  deleteBoard(docId: string): Promise<void> {
    const documentRef = this.firestore.collection(this.dbPath).doc(docId);
    return documentRef.delete();
  }
}
