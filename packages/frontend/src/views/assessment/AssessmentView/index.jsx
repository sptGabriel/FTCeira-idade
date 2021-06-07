import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  },
  teste: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

}));

const AssessmentView = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('idle');
  const timerRef = useRef();

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (query !== 'idle') {
      setQuery('idle');
      return;
    }
    setQuery('progress');
    timerRef.current = window.setTimeout(() => {
      setQuery('success');
    }, 1000);
  }, []);

  return (
    <Page
      className={classes.root}
      title="Avaliação"
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

              {query === 'success' ? (
                <div>
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
                </div>
              ) : (
                <Fade
                  className={classes.teste}
                  in={query === 'progress'}
                  style={{
                    transitionDelay: query === 'progress' ? '800ms' : '0ms',
                  }}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              )}

            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default AssessmentView;
