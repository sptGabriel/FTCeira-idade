import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Grid,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  select: {
    maxWidth: '200px'
  }
}));

const Toolbar = ({ className, title, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3">{title}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default Toolbar;
