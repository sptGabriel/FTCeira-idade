import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  performanceButton: {
    marginRight: theme.spacing(1)
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const addClassRoom = () => {
    navigate('/app/classrooms', { replace: true });
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          className={classes.performanceButton}
          color="primary"
          variant="contained"
        >
          Desempenho
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={addClassRoom}
        >
          Adicionar turma
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
