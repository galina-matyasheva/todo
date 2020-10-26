import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export const DialogAlert = ({isOpen, handleCloseDialog, dialogText}) => {

        return (

            <Dialog
                open={isOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent className='dialog'>
                    <DialogContentText id="alert-dialog-description">
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        ОК
                    </Button>
                </DialogActions>
            </Dialog>
        )
    };

export default DialogAlert

