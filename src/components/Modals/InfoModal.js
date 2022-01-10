import React,{useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export const InfoModal = ({title, setCloseModal}) => {
    const[open, setOpen] = useState(true);

    const handleOk = () => {
        setOpen(false);
        setCloseModal(false);
    }
    return (
        <Dialog
            open={open}
            onClose={handleOk}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Hey !"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {title}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOk}>Got it</Button>
        </DialogActions>
    </Dialog>
    )
}
