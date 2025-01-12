import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {QuizResponse} from '../../models/response/quiz-response';
import {GetQuestionResponse} from '../../models/response/getQuestion-response';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  http: HttpClient = inject(HttpClient);

  constructor() { }

  createQuiz(subjectId:string, directoryId: string){
    return this.http.post<QuizResponse>(`${environment.api}/quiz/${subjectId}/${directoryId}`, null);
  }

  getNextQuestion(){
    return this.http.get<GetQuestionResponse>(`${environment.api}/quiz/`);
  }

  getNumOfRemainingRequests(){
    return this.http.get<GetQuestionResponse>(`${environment.api}/quiz/numRemainingQuestions`)
  }

  shuffleArray(array: string[]): string[] {
    const shuffledArray:string[] = [...array]; // Create a copy of the array to avoid modifying the original array
    console.log(array)
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

}
