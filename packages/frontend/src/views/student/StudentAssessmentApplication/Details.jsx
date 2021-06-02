import 'date-fns';
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import data from './data_details';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Details = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values] = useState(data);

  return (
    <Grid
      item
      xs={12}
      {...rest}
    >
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader
          title="Avaliação"
          subheader=" "
          titleTypographyProps={{ variant: 'h4' }}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <Typography variant="h4" component="p">{values.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string
};

export default Details;
