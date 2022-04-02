import { Grid } from '@mui/material';
import LiveNote from './LiveNote';

const NotesContainer = (props) => {
    return (
        <Grid container>
            {props.notes.liveNotes.map(note => (
                <LiveNote
                    title={note.title} 
                    text={note.text} 
                    date={note.date}
                    editDate={note.editDate}  
                    key={note.id} 
                    id={note.id} 
                    onClick={() => props.modal.openNoteModal(note)}
                />
            ))}
        </Grid>
    );
}

export default NotesContainer;