import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Component from './Component';
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

const CoordinatorListView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Coordenadores"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Component coordinators={data} loading={false} />
        </Box>
      </Container>
    </Page>
  );
};

export default CoordinatorListView;
