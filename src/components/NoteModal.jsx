import { useEffect, useState, useRef } from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';
import { updateDB, getFormattedDate, getNextId } from '../utils/HelpFunctions';
import "./NoteModal.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: '#f8ed77',
  border: '2px solid #000',
  boxShadow: 24,
  p: "3px 20px"
};

const reminderStyle = {
  margin: "10px"
};

const NoteModal =(props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [reminder, setReminder] = useState("");
  const nextFreeId = useRef();
  const currentNote = props.notes.currentNote.current;
  const liveNotes = props.notes.liveNotes;

  const handleModalClose = () => props.modal.setModal(false);
  const handleTitle = e => setTitle(e.target.value);
  const handleText = e => setText(e.target.value);
  const handleReminder = e => setReminder(e.target.value);

  useEffect(() => {
    //Runs only on the first render
    getNextId().then(id => nextFreeId.current = id || 1);
    
  }, []);

  const handleSave = () =>{
    if(currentNote){ //update note
      currentNote.title = title;
      currentNote.text = text;
      currentNote.editDate = getFormattedDate(new Date());
      updateDB(["liveNotes"], [liveNotes]);
      props.notes.setLiveNotes(liveNotes);
    }else{ //new note
      const newNote = {
        id:nextFreeId.current++,
        date:getFormattedDate(new Date()), 
        title, text};
      const notes = [...liveNotes, newNote];
      updateDB(["liveNotes", "id"], [notes, nextFreeId.current]);
      props.notes.setLiveNotes(notes);
    }
    handleModalClose();
  }

  const handleDelete = () => {
    if(window.confirm("Are you sure ?")){
      const newLiveNotes = liveNotes.filter(note => note !== currentNote);
      const newDeadNotes = [...props.notes.deadNotes, currentNote];
      updateDB(["liveNotes", "deletedNotes"],[newLiveNotes, newDeadNotes]);
      props.notes.setLiveNotes(newLiveNotes);
      props.notes.setDeadNotes(newDeadNotes);
      handleModalClose();
    }
  }

  console.log(reminder);
  return (
    <div>
      <Modal open={props.modal.isModal} onClose={handleModalClose}>
        <Box sx={style}>
          <TextField onChange={handleTitle} label="Title" variant="standard" defaultValue={currentNote?.title ?? ""} fullWidth/>
          <TextField onChange={handleText} multiline={true} minRows={5} maxRows={15}  label="Your note..." variant="standard" defaultValue={currentNote?.text ?? ""}fullWidth/>
          <div className="buttons">
            <Button onClick={handleSave} variant="contained">Save</Button>
            <Button onClick={handleDelete} variant="contained">Delete</Button>
          </div>
          <TextField onChange={handleReminder} id="datetime-local" label="Set Reminder" sx={reminderStyle} type="datetime-local" defaultValue=""  InputLabelProps={{shrink: true}}/>
        </Box>
      </Modal>
    </div>
  );
}

export default NoteModal;