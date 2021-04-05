import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
  }
}));

const AssessmentRegister = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title=""
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <h1>Avaliações</h1>
        </Box>
      </Container>
    </Page>
  );
};

export default AssessmentRegister;
