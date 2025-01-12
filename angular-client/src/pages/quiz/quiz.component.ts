import {Component, inject, OnInit} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {QuizService} from '../../services/quiz-service/quiz.service';
import {GetQuestionResponse} from '../../models/response/getQuestion-response';
import {NzContentComponent} from 'ng-zorro-antd/layout';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    NzCardComponent,
    NzRadioGroupComponent,
    FormsModule,
    NzRadioComponent,
    NgForOf,
    NgClass,
    NgIf,
    NzContentComponent,
    NzRowDirective,
    NzColDirective,
    NzTypographyComponent,
    NzDividerComponent,
    NzButtonComponent
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{
  question: any= null;
  displayedAnswers:string[]= [];
  isCorrect:boolean = false;
  feedbackText:string='';

  quizService= inject(QuizService);

  ngOnInit(): void {
    this.quizService.getNextQuestion().subscribe({
      next: (res:GetQuestionResponse) =>{
        this.question = res.data
      },
      error: (error) =>{
        console.log(error)
      }
    });
    this.displayedAnswers = this.quizService.shuffleArray(this.question.answers)
    console.log(this.question.answers)
  }

  selectAnswer(answer: any) {

  }

  nextQuestion(){

  }
}
