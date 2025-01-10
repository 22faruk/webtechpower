import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {
  http = inject(HttpClient);

  constructor() { }

  createFlashcard(subjectId: string, question: string, answer: string, folderName: string){
    return this.http.post(`${environment.api}/flashcard/${subjectId}/${folderName}/create`,
      {
        question,
        answer
      }
      )
  }
  updateFlashcard(flashcardId: string, newQuestion: string, newAnswer: string){
    return this.http.patch(`${environment.api}/flashcard/${flashcardId}/update`,
      {
        newQuestion,
        newAnswer
      }
    )
  }
  deleteFlashcard(flashcardId: string){
    return this.http.delete(`${environment.api}/flashcard/${flashcardId}`)
  }
}
