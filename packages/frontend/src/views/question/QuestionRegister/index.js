import React from 'react';
import {
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import QuestionRegisterDetails from './QuestionRegisterDetails';

const useStyles = makeStyles(() => ({
  root: {
  }
}));

const QuestionRegister = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Questão - Registrar"
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid
          item
          lg={8}
          md={6}
          xs={12}
        >
          <QuestionRegisterDetails />
        </Grid>
      </Grid>

    </Page>
  );
};

export default QuestionRegister;
