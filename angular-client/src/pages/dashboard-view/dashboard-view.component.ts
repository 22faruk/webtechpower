import {Component, inject, OnInit} from '@angular/core';
import {SubjectService} from '../../services/subject-service/subject.service';
import ISubject from '../../models/subject';
import IFlashcard from '../../models/flashcard';

import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [
    SharedAntDesignModule,
    DecimalPipe
  ],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.css'
})
export class DashboardViewComponent implements OnInit{

  subjects!: ISubject[]
  flashcards: IFlashcard[] = []
  zero:number=0
  once:number=0
  good:number=0
  stat_zero:number=0
  stat_once:number=0
  stat_good:number=0

  subjectService = inject(SubjectService)

  ngOnInit(): void {
    this.subjectService.getSubjects().subscribe({
      next: (data) => {
        this.subjects = data.data
        //Add every flashcard user owns into an array
        this.subjects.forEach(subject => {
          subject.directories.forEach(directory => {
            directory.flashcards.forEach(flashcard => {
              this.flashcards.push(flashcard)
            });
          });
        });
        //Calculate statistics on basis of all flashcards
        this.flashcards.forEach(flashcard =>{
          switch (flashcard.count){
            case 0:
              this.zero+=1
              break
            case 1:
              this.once+=1
              break
            default:
              this.good+=1
          }
        })
        this.stat_zero= this.zero/this.flashcards.length*100;
        this.stat_once= this.once/this.flashcards.length*100;
        this.stat_good= this.good/this.flashcards.length*100;
      }
    })

  }

}
