import { Grid } from '@mui/material';
import "./LiveNote.css"

const LiveNote = (props) => {
    return (
        <Grid item sx={{margin:"0 10px"}} className="noteContainer" onClick={props.onClick}>
            <div className="contentContainer">
                <div className="date">{"Created: " + props.date}</div>
                {props.editDate && <div className="date">{"Modified: " + props.editDate}</div>}
                {props.title && <div className="title">{props.title}</div>}
                <div>{props.text}</div>
            </div>
        </Grid>
    );
}

export default LiveNote;