import IFlashcard from './flashcard';

export default interface IQuiz{
  _id: string;
  owner: string;
  flashcards: IFlashcard[];
}
