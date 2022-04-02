import { Modal, Box } from '@mui/material';
import { updateDB } from '../utils/HelpFunctions';
import "./ArchiveModal.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 500,
  bgcolor: '#f8ed77',
  border: '2px solid #000',
  boxShadow: 24,
  p: "3px 20px"
};

const ArchiveModal =(props) => {


  const handleModalClose = () => props.setModal(false);

  const handleNoteRestore = restoredNote => {
    if(window.confirm("Are you sure ?")){
      const liveNotes = [...props.notes.liveNotes, restoredNote];
      const deletedNotes = props.notes.deadNotes.filter(note => note !== restoredNote);
      updateDB(["liveNotes", "deletedNotes"],[liveNotes, deletedNotes]);
      props.notes.setLiveNotes(liveNotes);
      props.notes.setDeadNotes(deletedNotes);
      handleModalClose();
    }
  }

  return (
    <div>
      <Modal open={props.modal} onClose={handleModalClose}>
        <Box sx={style}>
          <div className="archiveTitle">
            <h3>ARCHIVE</h3>
            <h4>Click on note to restore</h4>
          </div>
          <ul>
            {props.notes.deadNotes.map(note => (
              <li key={note.id} onClick={() => handleNoteRestore(note)}>
                <h4>{note.title}</h4>
                <p>{note.text}</p>
              </li>
            ))}
          </ul>
        </Box>
      </Modal>
    </div>
  );
}

export default ArchiveModal;