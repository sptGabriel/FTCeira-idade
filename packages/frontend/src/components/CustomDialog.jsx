import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const CustomDialog = ({ openStatus, handleClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openStatus);
  });

  // function callResponse(res) {
  //   setResponse(res);
  //   return response;
  // }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Use Google s location service?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomDialog.propTypes = {
  openStatus: PropTypes.bool,
  handleClose: PropTypes.func
};

export default CustomDialog;
