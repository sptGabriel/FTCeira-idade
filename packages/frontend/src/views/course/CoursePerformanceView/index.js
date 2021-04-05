import React from 'react';
import {
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
  }
}));

const CoursePerformanceView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Desempenho do curso"
    >
      <h1>Gráfico</h1>
    </Page>
  );
};

export default CoursePerformanceView;
