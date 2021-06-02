import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';
import Details from './Details';
import { Questions } from './QuestionRegisterDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1024,
  },
  gridFilter: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(7),
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5)
    },
  },
  title: {
    flexGrow: 1,
  },
  parameterText: {
    color: 'white',
  },

  hiddenButton: {
    visibility: 'hidden'
  }

}));

const AssessmentRegister = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Nova avaliação"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.card}
          >
            <Grid
              item
              xs
              container
              direction="column"
              spacing={2}
            >
              <Grid
                item
                xs
              >
                <Details />
              </Grid>
              <Grid
                item
                xs
              >
                <Questions />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default AssessmentRegister;
