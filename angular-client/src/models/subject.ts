import IFlashcard from './flashcard';

export interface IDirectory {
  folderName: string;
  flashcards: IFlashcard[]; // Ein Array von Flashcards
}

export default interface ISubject {
  _id: string;         // ID des Subjects
  owner: string;       // ID des Owners (Benutzer)
  subjectName: string; // Name des Subjects
  directories: IDirectory[]; // Ein Array von Directory-Objekten
  __v: number;         // Versionierung (für Mongoose)
}
