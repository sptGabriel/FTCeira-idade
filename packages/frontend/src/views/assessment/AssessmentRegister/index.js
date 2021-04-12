import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
// import Toolbar from './Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Edit as QuestionIcon } from 'react-feather';
import Details from './Details';
import data from './data';
import Questions from './Questions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1024,
  },
}));

const AssessmentRegister = () => {
  const classes = useStyles();
  const [questions] = useState(data);
  const [items, setItems] = useState(0);

  const handleCheckBox = (event) => {
    if (event.target.checked === true) {
      setItems(Math.max(items + 1, 0));
    } else {
      setItems(Math.max(items - 1, 0));
    }
  };

  return (
    <Page
      className={classes.root}
      title="Questões"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.card}
          >
            <Grid
              item
              xs
              container
              direction="column"
              spacing={2}
            >
              <Grid
                item
                xs
              >
                <Details />
              </Grid>

              <AppBar position="sticky">
                <Toolbar variant="dense">
                  <IconButton edge="start" color="inherit" aria-label="question-icon">
                    <QuestionIcon />
                  </IconButton>
                  <Typography variant="h3" className={classes.title}>
                    Questões
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="h4" className={classes.title}>
                        { items === 1 ? ` ${items} selecionada` : '' }
                        { items > 1 ? ` ${items} selecionadas` : '' }
                      </Typography>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>

              {questions.map((question) => (
                <Grid
                  item
                  key={question.id}
                  xs
                >
                  <Questions
                    className={classes.questionCard}
                    question={question}
                    onChange={handleCheckBox}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default AssessmentRegister;
