import  { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const ConfirmationModal = ({title, yesAction, noAction}) => {
    const[open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        noAction(false);
    };

    const handleYesClick = () => {
        noAction(false);
        yesAction();
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirmation !"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {title}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => noAction(false) }>No</Button>
                <Button onClick={handleYesClick} autoFocus> Yes </Button>
        </DialogActions>
    </Dialog>
    )
}
