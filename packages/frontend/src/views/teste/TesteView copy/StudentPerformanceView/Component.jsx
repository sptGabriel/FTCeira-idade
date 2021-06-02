import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Container,
  Card,
  Grid,
  makeStyles
} from '@material-ui/core';
import data from './data';
import LearningPerformance from '../../../dashboard/DashboardView/LearningPerformance';
import AverageStudents from '../../../dashboard/DashboardView/AverageStudents';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Component = ({ className, ...rest }) => {
  const classes = useStyles();
  const [dataset] = useState(data);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={12}
            xl={12}
            xs={12}
          >
            <LearningPerformance title="DESEMPENHO" dataset={dataset} filter />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AverageStudents />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export default Component;
