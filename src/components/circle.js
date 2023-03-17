const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

class Circle {
  constructor () {
    this.notesContainer = $(".circle__outer");
    this.activeNotesContainer = $(".circle__inner");
    this.activeNotes = [];
  }

  #createNote(note, degree) {
    const noteWrapper = document.createElement("div");
    noteWrapper.classList.add("note-wrapper");
    noteWrapper.style.transform = `rotate(${degree}deg)`;
    const content = document.createElement("div");
    content.classList.add("note-content");
    content.setAttribute("data-note-child-name", note);
    content.style.transform = `rotate(${360 - degree}deg)`;

    noteWrapper.setAttribute("data-note-parent-name", note);
    noteWrapper.append(content);
    return noteWrapper;
  }

  appendNotes(notes) {
    this.notesContainer.innerText = "";
    const length = (360 / notes.length);
    notes.forEach((note, idx) => {
      this.notesContainer.append(this.#createNote(note, idx * length));
    });
  }

  appendActiveNotes() {
    this.activeNotesContainer.innerText = this.activeNotes.join("\n");
  }

  clearActiveNotes() {
    this.activeNotesContainer.innerText = "";
    this.activeNotes = [];
  }

  #getActiveNote(note) {
    return $(`[data-note-parent-name="${note}"]`)
  }

  setActiveNoteStyle(note) {
    this.activeNotes.push(note);
    this.appendActiveNotes()
    this.#getActiveNote(note).classList.add("active");
  }
  
  setActiveChordStyle(notes) {
    notes.forEach(note => {
      this.setActiveNoteStyle(note)
    });
  }
  
  removeActiveNoteStyle(note) {
    this.#getActiveNote(note).classList.remove("active");
    this.activeNotes = this.activeNotes.filter(n => n !== note);
    this.appendActiveNotes();
  }

  removeActiveChordStyle() {
    $$(`[data-note-parent-name]`).forEach(note => {
      note.classList.remove("active")
    });
    this.clearActiveNotes();
  }
}

const circle = new Circle();
export default circle;