import React from 'react';
import {
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CourseViewDetails from './CourseViewDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
  }
}));

const CourseEdit = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Curso"
    >
      <div>
        {/* <Container maxWidth="lg"> */}
        <CourseViewDetails />
      </div>
    </Page>
  );
};

export default CourseEdit;
