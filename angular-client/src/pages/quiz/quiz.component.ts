import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {QuizService} from '../../services/quiz-service/quiz.service';
import {GetQuestionResponse} from '../../models/response/getQuestion-response';
import {SubjectService} from '../../services/subject-service/subject.service';
import ISubject from '../../models/subject';
import {SharedAntDesignModule} from '../../module/shared-ant-design/shared-ant-design.module';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    SharedAntDesignModule
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{
  question: any= null;
  displayedAnswers:string[]= [];
  displayQuestion:boolean=false;
  isCorrect:boolean = false;
  feedbackText:string='';
  selectedSubject!:ISubject
  selectedDiretory:string=''
  subjects!:ISubject[]

  quizService= inject(QuizService);
  subjectService = inject(SubjectService)

  ngOnInit(): void {
    this.subjectService.getSubjects().subscribe({
      next:(res) =>{
        this.subjects=res.data
        console.log(this.subjects)
      }
    })
    this.quizService.getNextQuestion().subscribe({
      next: (res:GetQuestionResponse) =>{
        this.question = res.data
        this.displayQuestion=true
      },
      error: (error) =>{
        console.log(error)
        this.displayQuestion=false
      }
    });
    this.displayedAnswers = this.quizService.shuffleArray(this.question.answers)
    console.log(this.question.answers)
  }

  createQuiz(){
    this.displayQuestion=true;
    console.log(this.selectedSubject)
  }

  selectAnswer(answer: string) {
    this.quizService.validateQuestion(this.question.questionId, answer).subscribe({
      next: (res) =>{
        this.isCorrect=res.data.isCorrect
        if(this.isCorrect){
          this.feedbackText='Your answer was correct!'
        }else {
          this.feedbackText='Your answer was incorrect!'
        }
      }
    })

  }

  nextQuestion(){
    this.quizService.getNextQuestion().subscribe({
      next: (res:GetQuestionResponse) =>{
        this.question = res.data
        this.displayedAnswers = this.quizService.shuffleArray(this.question.answers)
      },
      error: (error) =>{
        console.log(error)
        this.displayQuestion=false
      }
    })
  }
}
