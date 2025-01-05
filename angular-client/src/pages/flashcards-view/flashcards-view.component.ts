import {Component, inject, OnInit} from '@angular/core';
import {NzContentComponent} from 'ng-zorro-antd/layout';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NgForOf, NgIf} from '@angular/common';
import {FlashcardsService} from '../../services/flashcards-service/flashcards.service';
import {SubjectService} from '../../services/subject-service/subject.service';
import ISubject, {IDirectory} from '../../models/subject';
import IFlashcard from '../../models/flashcard';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {strict} from 'node:assert';

@Component({
  selector: 'app-flashcards-view',
  standalone: true,
  imports: [
    NzContentComponent,
    NzDividerComponent,
    NzColDirective,
    NzTypographyComponent,
    NzButtonComponent,
    NzRowDirective,
    NgForOf,
    NgIf,
    NzInputDirective,
    FormsModule
  ],
  templateUrl: './flashcards-view.component.html',
  styleUrl: './flashcards-view.component.css'
})
export class FlashcardsViewComponent implements OnInit{
  userId!: string;
  subjects!: ISubject[];
  currentSubject!: ISubject| null;
  currentFolder!: IDirectory;
  currentFlashcard !: IFlashcard|null;
  seeAnswer: boolean = false;
  showAddSubjectModal: boolean= false;
  showAddFolderModal: boolean= false;
  showAddFlashcardModal: boolean= false;
  showChangeSubjectModal: boolean = false;
  showChangeFolderModal: boolean = false;
  flashcardViewMulti: boolean = true;
  currentFlashcardIndex: number = 0;
  maxLength : number = 0;
  openFlashcardUpdate: boolean = false;

  flashcardService = inject(FlashcardsService)
  subjectService = inject(SubjectService)

  constructor() {
  }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe({next: (data)=>{
        this.subjects = data.data;
        this.subjects.forEach(subject => {
          subject.directories.forEach(directory => {
            directory.flashcards.forEach(flashcard => {
              flashcard.showAnswer = false;
            });
          });
        });

      }})
  }

  selectSubject(subject: ISubject){
    this.currentSubject = subject;
  }
  selectFolder(folderName: IDirectory){
    this.currentFolder = folderName;
    this.maxLength = this.currentFolder.flashcards.length-1;
  }

  updateFlashcard(newQuestion: string, newAnswer: string) {
    if (this.currentFlashcard) {
      const flashcardId: string = this.currentFlashcard?._id;
      this.flashcardService.updateFlashcard(flashcardId, newQuestion, newAnswer)
        .subscribe({
          next: () => {
            console.log("flashcard updated")
          }
        })
    }
  }

  deleteSubject(){
    if (this.currentSubject){
    const subjectId: string = this.currentSubject._id;
    this.subjectService.deleteSubject(subjectId).subscribe({next:()=>{
        console.log("subject deleted")
      }})
    this.currentSubject = null;
    window.location.reload();
    }
  }
  deleteFolder(){
    if(this.currentSubject) {
      const folderName: string = this.currentFolder.folderName;
      const newDirectories: IDirectory[] = this.currentSubject?.directories.filter(
        (directory) => directory.folderName !== folderName) || [];
      this.changeSubjectOrFolder("",newDirectories);
    }
  }

  // updateSubject(subjectId: string, subjectName: string, directories: IDirectory){
  //   this.subjectService.updateSubject(subjectId,subjectName,directories).subscribe({next: (data)=>{
  //       console.log("subject updated successfully")
  //     },
  //   error: (err)=>{
  //     console.log(err)
  //   }})
  // }
  toggleShowAnswer(card: IFlashcard){
    this.currentFolder.flashcards = this.currentFolder.flashcards.map((flashcard) =>{
      if (flashcard == card){
        return {... flashcard, showAnswer: !flashcard.showAnswer}
      }
      return flashcard
    })
  }
  openAddSubjectModal(){
    this.showAddSubjectModal = true;
  }
  openAddFolderModal(){
    this.showAddFolderModal = true;
  }
  openAddFlashcardModal(){
    this.showAddFlashcardModal = true;
  }
  confirmAddSubject(subjectName: string){
    this.subjectService.createSubject(subjectName).subscribe({next:()=>{
        console.log("subject created successfully")
      }})
    this.showAddSubjectModal = false;
    window.location.reload();
  }
  confirmAddFolder(newFolderName: string){
    if(this.currentSubject) {
      const newDirectories: IDirectory[] = [...this.currentSubject.directories,{ folderName: newFolderName, flashcards: [] }];
      this.subjectService.updateSubject(this.currentSubject._id, "",newDirectories).subscribe({
        next: () =>{
          console.log("New Folder added")
        }
      })
      this.showAddFolderModal = false;
      window.location.reload();
    }
    else{
      console.log("No Subject for Folder selected")
    }
  }
  confirmAddFlashcard(question: string, answer: string){
    if(this.currentFolder && this.currentSubject){
      const subjectId: string = this.currentSubject._id;
      this.flashcardService.createFlashcard(subjectId,question,answer,this.currentFolder.folderName).subscribe({
        next:()=>{
          console.log("Flashcard created successfully")
        }
      })
      this.showAddFlashcardModal = false;
      window.location.reload();
    }
    else {
      console.log("No Folder for the flashcard selected")
    }

  }
  changeSubjectOrFolder(subjectName: string, directory: IDirectory[]){
    if (this.currentSubject) {
      const subjectId: string = this.currentSubject._id
      this.subjectService.updateSubject(subjectId, subjectName, directory).subscribe({
        next: () => {
          console.log("Subject or Folder successfully changed")
        }
      })
      this.showChangeSubjectModal = false;
      this.showChangeFolderModal = false;
      window.location.reload();
    }
  }

  closePopup(){
    this.showAddSubjectModal = false;
    this.showAddFolderModal = false;
    this.showAddFlashcardModal = false;
    this.showChangeSubjectModal = false;
    this.showChangeFolderModal = false;
  }

  showSubjectChangeModal(){
    this.showChangeSubjectModal = true;
  }
  showFolderChangeModal(){
    this.showChangeFolderModal = true;
  }
  changeFolder(newFolderName: string){
    if (this.currentSubject) {
      const folderName: string = this.currentFolder.folderName;
      const newDirectory: IDirectory[] = this.currentSubject?.directories.map((directory) => {
        if (directory.folderName === folderName) {
          return { ...directory, folderName: newFolderName };
        }
        return directory;
      }) || [];
      this.changeSubjectOrFolder("",newDirectory);
    }
  }
  toggleFlashcardView(multiOrSingle: boolean){
    if (multiOrSingle != this.flashcardViewMulti) {
      this.currentFlashcard = null;
      this.flashcardViewMulti = multiOrSingle;
    }
  }
  goToPrevious() {
    if (this.currentFlashcardIndex > 0) {
      this.currentFlashcardIndex--;
      this.currentFlashcard = null;
    }
  }

  goToNext() {
    if (this.currentFlashcardIndex < this.currentFolder.flashcards.length - 1) {
      this.currentFlashcardIndex++;
      this.currentFlashcard = null;
    }
  }
  selectFlashcard(card: IFlashcard){
    this.currentFlashcard = card;
    console.log(this.currentFlashcard.answer);
    console.log(this.currentFlashcard._id)
  }
  openUpdateFlashcard(){
    this.openFlashcardUpdate = true;
  }
  rightOrWrong(answer: string){
    if(this.currentFlashcard) {
      const oldAnswer: string= this.currentFlashcard.answer;
      const oldQuestion: string = this.currentFlashcard.question;
      if (answer == "right") {
        const newCount = this.currentFlashcard.count++;
        this.updateFlashcard(oldQuestion,oldAnswer)
      } else {
        const newCount = 0;
        this.updateFlashcard(oldQuestion,oldAnswer);
      }
    }
  }
  deleteFlashcard(){
    if (this.currentFlashcard) {
      const flashcardId: string = this.currentFlashcard._id
      this.flashcardService.deleteFlashcard(flashcardId).subscribe({next:()=>{
          console.log(`flashcard: ${flashcardId} deleted`)
        }})
      this.currentFlashcard = null;
      window.location.reload();
    }
  }
}
