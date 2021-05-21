import React, { useState } from 'react';
import {
  Grid,
  makeStyles
} from '@material-ui/core';
// import Page from 'src/components/Page';
import Component from './Component';
import data from './data';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1024
  }
}));

const StudentAssessmentListView = () => {
  const classes = useStyles();
  // const [loading] = useState(false);
  const [assessments] = useState(data);

  return (
  // <Page
  //   title="Avaliações"
  // >
  //   <Container maxWidth={false}>
  //     <Box mt={3}>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs container direction="column" className={classes.root}>
        <Component assessments={assessments} />
      </Grid>
    </Grid>
  //     </Box>
  //   </Container>
  // </Page>
  );
};

export default StudentAssessmentListView;
