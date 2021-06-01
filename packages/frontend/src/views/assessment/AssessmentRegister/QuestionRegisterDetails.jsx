import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  Button,
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

const defaultValues = {
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
    handleSubmit,
    getValues,
    errors,
    watch,
    reset,
    setValue
  } = useForm({
    defaultValues,
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    const a = JSON.parse(localStorage.getItem('assessment_header'));
    if (localStorage.getItem('assessment_header') !== null) {
      const b = { ...a, questions: data.questions };
      localStorage.setItem('assessment_register', JSON.stringify(b, null, 2));
      console.log(JSON.stringify(b, null, 2));
    }
  };

  // WATCH
  console.log(JSON.stringify(watch('questions'), null, 2));

  return (
    <Container
     // maxWidth="lg"
      className={clsx(classes.root, className)}
      {...rest}
    >

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CardContent>
          <FieldArray
            {...{
              control, register, defaultValues, getValues, setValue, errors
            }}
          />
        </CardContent>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => reset(defaultValues)}
        >
          Reset
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Enviar
        </Button>

      </form>
    </Container>
  );
}

Questions.propTypes = {
  className: PropTypes.string
};
