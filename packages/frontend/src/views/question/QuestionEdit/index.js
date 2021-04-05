import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import QuestionEditDetails from './QuestionEditDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const QuestionEdit = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Questões - Editar"
    >
      <Container maxWidth="false">
        {/* <Container maxWidth="lg"> */}
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
            <QuestionEditDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default QuestionEdit;
