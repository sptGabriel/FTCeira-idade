import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AssessmentListView = () => {
  const classes = useStyles();
  const [loading] = useState(false);
  const [assessments] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Avaliações"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results assessments={assessments} loading={loading} />
        </Box>
      </Container>
    </Page>
  );
};

export default AssessmentListView;
