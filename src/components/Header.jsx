import "./Header.css"
import Logo from "./Logo";
import { Button } from "@mui/material";
import { useState } from "react";
import ArchiveModal from "./ArchiveModal";

const Header = (props) => {
    const [archivedModal, setArchviedModal] = useState(false);
    const openArchivedModal = () => {
            setArchviedModal(true)
    }

    return (
        <header className="header">
            <Logo>NOTES</Logo>
            <Button onClick={props.modal.openNoteModal} variant="contained"> Add note</Button>
            <Button onClick={openArchivedModal} variant="contained"> Archive</Button>
            <Button variant="contained"> Reminders</Button>
            <ArchiveModal modal={archivedModal} setModal={setArchviedModal} notes={props.notes}/>
        </header>
    );
}

export default Header;