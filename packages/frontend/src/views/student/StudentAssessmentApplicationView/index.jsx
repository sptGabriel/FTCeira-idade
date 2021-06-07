import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import api from 'src/service/ApiService';
import Component from './Component';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxWidth: 1024
  }
}));

const StudentAssessmentListView = () => {
  const classes = useStyles();
  const [loading] = useState(false);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    api.fetchAssessments().then((res) => {
      console.log(JSON.stringify(res.data, null, 2));
      setAssessments(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Page
      title="Avaliações"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs container direction="column" className={classes.root}>
              <Component assessments={assessments} loading={loading} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default StudentAssessmentListView;
