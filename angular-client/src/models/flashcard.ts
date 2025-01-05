export default interface IFlashcard {
  _id: string;
  question: string;
  answer: string;
  showAnswer: boolean; // Gibt an, ob die Antwort sichtbar ist
  count: number; // Gibt an wie oft diese Flashcards hintereinander richtig beantwortet wurde
}
