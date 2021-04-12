import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Component from './Component';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const StudentAssessmentListView = () => {
  const classes = useStyles();
  const [loading] = useState(false);
  const [assessments] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Avaliações"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Component assessments={assessments} loading={loading} />
        </Box>
      </Container>
    </Page>
  );
};

export default StudentAssessmentListView;
