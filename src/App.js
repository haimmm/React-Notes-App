import NoteModal from "./components/NoteModal";
import NotesContainer from "./components/NotesContainer";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { getNotesFromDB } from "./utils/HelpFunctions";
//import localforage from "localforage";

function App() {
  //localforage.clear();
  const [liveNotes, setLiveNotes] = useState([]);
  const [deadNotes, setDeadNotes] = useState([]);
  const [isModal, setModal] = useState(false);
  const currentNote = useRef(null);
  const notes = {liveNotes, setLiveNotes, deadNotes, setDeadNotes, currentNote};

  useEffect(() => {
    //Runs only on the first render
    getNotesFromDB().then(notesFromDB => {
      const [live, dead] = notesFromDB;
      setLiveNotes(live);
      setDeadNotes(dead);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const openNoteModal = note => {
    if(note.id){ 
      currentNote.current = note;
    }else{ // note= new note button click event
      currentNote.current = null;
    }
    setModal(true);
  }
  const modal = {isModal, setModal, openNoteModal}

  return (
    <div className="app">
        <Header notes={notes} modal={modal}/>
        <NotesContainer notes={notes} modal={modal}/>
        <NoteModal notes={notes} modal={modal}/>
    </div>
  );
}
export default App;

