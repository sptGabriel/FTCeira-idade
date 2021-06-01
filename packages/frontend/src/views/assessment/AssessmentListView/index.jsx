import React, { useState } from 'react';
import {
  Fab,
  Grid,
  Container,
  makeStyles
} from '@material-ui/core';
// import Page from 'src/components/Page';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import CustomTooltip from 'src/utils/CustomTooltip';
import Component from './Component';
// import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    // minHeight: '100%',
    // paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3)
    maxWidth: 1024
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(4),
  },
  assessment: {
    maxWidth: 1024,
    marginTop: theme.spacing(3)
  }
}));

const AssessmentListView = ({ title }) => {
  const classes = useStyles();
  const [loading] = useState(false);
  const [assessments] = useState(data);
  const navigate = useNavigate();

  const addQuestion = () => {
    navigate('/app/assessment-register', { replace: false });
  };

  return (
  // <Page
  //   title="Avaliações"
  // >
    <Container maxWidth={false}>
      <CustomTooltip title="adicionar nova avaliação">
        <Fab color="primary" aria-label="add" className={classes.fab}>
          <AddIcon onClick={() => addQuestion()} />
        </Fab>
      </CustomTooltip>
      {/* <Box mt={3}> */}
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm container className={title ? classes.root : classes.assessment}>
            <Grid item xs container direction="column">
              <Component assessments={assessments} loading={loading} title={title || 'Avaliações'} />
            </Grid>
          </Grid>
        </Grid>
        {/* </Box> */}
      </div>
      {/* </Container>
   </Page> */}
    </Container>
  );
};

AssessmentListView.propTypes = {
  title: PropTypes.string
};

export default AssessmentListView;
