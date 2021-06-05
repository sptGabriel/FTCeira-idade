import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const CustomDialog = ({ openStatus, handleClose, handleAction }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openStatus);
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Tem certeza?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Texto texto texto texto texto texto texto texto texto texto texto
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleAction} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomDialog.propTypes = {
  openStatus: PropTypes.bool,
  handleClose: PropTypes.func,
  handleAction: PropTypes.func
};

export default CustomDialog;
