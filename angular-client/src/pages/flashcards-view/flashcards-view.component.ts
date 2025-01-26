import {Component, inject, OnInit} from '@angular/core';

import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FlashcardsService} from '../../services/flashcards-service/flashcards.service';
import {SubjectService} from '../../services/subject-service/subject.service';
import ISubject, {IDirectory} from '../../models/subject';
import IFlashcard from '../../models/flashcard';
import {FormsModule} from '@angular/forms';
import {SharedAntDesignModule} from '../../module/shared-ant-design/shared-ant-design.module';

@Component({
  selector: 'app-flashcards-view',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    NgClass,
    SharedAntDesignModule
  ],
  templateUrl: './flashcards-view.component.html',
  styleUrl: './flashcards-view.component.css'
})
export class FlashcardsViewComponent implements OnInit{
  userId!: string;
  subjects!: ISubject[];
  currentSubject!: ISubject| null;
  currentFolder!: IDirectory| null;
  currentFlashcard !: IFlashcard|null;
  showAddSubjectModal: boolean= false;
  showAddFolderModal: boolean= false;
  showAddFlashcardModal: boolean= false;
  showChangeSubjectModal: boolean = false;
  showChangeFolderModal: boolean = false;
  flashcardViewMulti: boolean = true;
  currentFlashcardIndex: number = 0;
  maxLength : number = 0;
  openFlashcardUpdate: boolean = false;
  isAscending: boolean = true;
  showChnageDeletePopopSubject: boolean = false;
  showChnageDeletePopopFolder: boolean = false;
  showChangeDeletePopupFlashcard: boolean = false;

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
    if (this.currentSubject != subject){
      this.currentSubject = subject;
      this.showChnageDeletePopopSubject = false;
      this.currentFolder = null;
      this.showChnageDeletePopopFolder = false;
      this.currentFlashcard = null;
      this.showChangeDeletePopupFlashcard = false;
    }
  }
  selectFolder(folder: IDirectory){
    if (this.currentFolder != folder){
      this.currentFolder = folder;
      this.showChnageDeletePopopFolder = false;
      this.currentFlashcard = null;
      this.showChangeDeletePopupFlashcard = false;
      this.maxLength = this.currentFolder.flashcards.length - 1;
    }
  }
  selectFlashcard(card: IFlashcard){
    if (this.currentFlashcard != card){
      this.currentFlashcard = card;
      this.showChangeDeletePopupFlashcard = false;
    }
  }
  updateFlashcard(newQuestion: string, newAnswer: string, card: IFlashcard|null) {
    if (this.currentFlashcard && card) {
      const flashcardId: string = card._id;
      this.flashcardService.updateFlashcard(flashcardId, newQuestion, newAnswer, card.count)
        .subscribe({
          next: () => {
            if (this.currentFlashcard) {
              this.currentFlashcard.question = newQuestion;
              this.currentFlashcard.answer = newAnswer;
              this.currentFlashcard.count = card.count;
            }
            console.log("flashcard updated")
          }
        })
    }
  }

  deleteSubject(){
    if (this.currentSubject){
    const subjectId: string = this.currentSubject._id;
    this.subjectService.deleteSubject(subjectId).subscribe({next:()=>{
        this.subjects = this.subjects.filter(subject => subject._id !== subjectId);
        console.log("subject deleted")
      }})
    this.currentSubject = null;
    this.currentFolder = null;
    this.currentFlashcard = null;
    }
  }
  deleteFolder(){
    if(this.currentSubject && this.currentFolder) {
      const folderName: string = this.currentFolder.folderName;
      this.currentSubject.directories = this.currentSubject?.directories.filter(
        (directory) => directory.folderName !== folderName) || [];
      this.changeSubjectOrFolder("",this.currentSubject.directories);
      this.currentFolder = null;
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
    if (this.currentFolder){
    this.currentFolder.flashcards = this.currentFolder.flashcards.map((flashcard) =>{
      if (flashcard == card){
        return {... flashcard, showAnswer: !flashcard.showAnswer}
      }
      return flashcard
    })
    }
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
          this.currentSubject?.directories.push({folderName: newFolderName, flashcards: []})
          console.log("New Folder added")
        }
      })
      this.showAddFolderModal = false;
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
          if (subjectName != "" && this.currentSubject) {
            this.currentSubject.subjectName = subjectName;
          }
          console.log("Subject or Folder successfully changed")
        }
      })
      this.showChangeSubjectModal = false;
      this.showChangeFolderModal = false;
    }
  }

  closePopup(){
    this.showAddSubjectModal = false;
    this.showAddFolderModal = false;
    this.showAddFlashcardModal = false;
    this.showChangeSubjectModal = false;
    this.showChangeFolderModal = false;
    this.openFlashcardUpdate = false;
  }

  showSubjectChangeModal(){
    this.showChangeSubjectModal = true;
  }
  showFolderChangeModal(){
    this.showChangeFolderModal = true;
  }
  changeFolder(newFolderName: string){
    if (this.currentSubject && this.currentFolder) {
      const folderName: string = this.currentFolder.folderName;
      this.currentSubject.directories = this.currentSubject?.directories.map((directory) => {
        if (directory.folderName === folderName) {
          return { ...directory, folderName: newFolderName };
        }
        return directory;
      }) || [];
      this.changeSubjectOrFolder("",this.currentSubject.directories);
    }
  }
  toggleFlashcardView(multiOrSingle: boolean){
    if (multiOrSingle != this.flashcardViewMulti) {
      this.currentFlashcard = null;
      this.flashcardViewMulti = multiOrSingle;
      this.showChangeDeletePopupFlashcard = false;
    }
  }
  goToPrevious() {
    if (this.currentFlashcardIndex > 0) {
      this.currentFlashcardIndex--;
      this.currentFlashcard = null;
      this.showChangeDeletePopupFlashcard = false;
    }
  }

  goToNext() {
    if (this.currentFolder) {
      if (this.currentFlashcardIndex < this.currentFolder.flashcards.length - 1) {
        this.currentFlashcardIndex++;
        this.currentFlashcard = null;
        this.showChangeDeletePopupFlashcard = false;
      }
    }
  }
  openUpdateFlashcard(){
    this.openFlashcardUpdate = true;
  }
  rightOrWrong(answer: string,card: IFlashcard){
    if(this.currentFlashcard) {
      const oldAnswer: string= this.currentFlashcard.answer;
      const oldQuestion: string = this.currentFlashcard.question;
      if (answer == "right") {
        card.count++;
        this.updateFlashcard(oldQuestion,oldAnswer,card)
        card.showAnswer = false;
      } else {
        card.count = 0;
        this.updateFlashcard(oldQuestion,oldAnswer,card);
        card.showAnswer = false;
      }
    }
  }
  deleteFlashcard(){
    if (this.currentFlashcard) {
      const flashcardId: string = this.currentFlashcard._id
      this.flashcardService.deleteFlashcard(flashcardId).subscribe({next:()=>{
        if (this.currentFolder) {
          this.currentFolder.flashcards = this.currentFolder?.flashcards.filter(card => card._id !== flashcardId);
        }
          console.log(`flashcard: ${flashcardId} deleted`)
        }})
      this.currentFlashcard = null;
    }
  }
  sortFlashcards(){
    if (this.currentFolder) {
      this.currentFolder.flashcards.sort((a, b) =>
        this.isAscending ? a.count - b.count : b.count - a.count
      );
      this.isAscending = !this.isAscending;
    }
  }
  editSubject(subject: ISubject){
    if (this.currentSubject == subject) {
      this.showChnageDeletePopopSubject = !this.showChnageDeletePopopSubject;
    }
    else {
      this.currentSubject = subject;
      this.showChnageDeletePopopSubject = true;
    }
  }
  editFolder(folder: IDirectory){
    if (this.currentFolder == folder) {
      this.showChnageDeletePopopFolder = !this.showChnageDeletePopopFolder;
    }
    else {
      this.currentFolder = folder;
      this.showChnageDeletePopopFolder = true;
    }
  }
  editFlashcard(flashcard: IFlashcard){
    if (this.currentFlashcard == flashcard) {
      this.showChangeDeletePopupFlashcard = !this.showChangeDeletePopupFlashcard;
    }
    else {
      this.currentFlashcard = flashcard;
      this.showChangeDeletePopupFlashcard = true;
    }
  }
}
