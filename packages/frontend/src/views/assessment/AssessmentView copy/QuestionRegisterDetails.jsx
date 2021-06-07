import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  CardContent,
  Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FieldArray from './fieldArray';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const storageQuestions = JSON.parse(localStorage.getItem('selected_assessment'));
const isLocal = localStorage.getItem('selected_assessment');

const defaultValues = isLocal !== null ? {
  questions: storageQuestions.questions
}
  : {
    questions: [
      {
        questioning: '',
        alternatives: []
      },
    ]
  };

export function Test() {
  return (
    <p>test</p>
  );
}

export function Questions({ className, ...rest }) {
  const classes = useStyles();

  const {
    control,
    register,
    getValues,
    errors,
    setValue
  } = useForm({
    defaultValues,
    mode: 'onChange'
  });

  return (
    <Container
      className={clsx(classes.root, className)}
      {...rest}
    >
      <form>
        <CardContent>
          <FieldArray
            {...{
              control, register, defaultValues, getValues, setValue, errors
            }}
          />
        </CardContent>
      </form>
    </Container>
  );
}

Questions.propTypes = {
  className: PropTypes.string
};
