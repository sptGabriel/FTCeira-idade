import React from 'react';
import {
  Button,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useNavigate } from 'react-router-dom';
import ComponentCourse from './ComponentCourse';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  card: {
    height: '100%'
  },
  pagination: {
    bottom: '0px',
    zIndex: '0'
  },
}));

const HomeView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const clickActions = () => {
    navigate('/app/student-assessments', { replace: false });
  };

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <Button color="primary" onClick={() => clickActions()}>propisório avaliações discente</Button>

      <Container maxWidth={false}>
        <ComponentCourse courses={data} courseCategory="Sistemas de Informação" />
        <ComponentCourse courses={data} courseCategory="Biomedicina" />
        <ComponentCourse courses={data} courseCategory="Direito" />
        <ComponentCourse courses={data} courseCategory="Enfermagem" />
        <ComponentCourse courses={data} courseCategory="Engenharia Ambiental" />
        <ComponentCourse courses={data} courseCategory="Engenharia Civil" />
        <ComponentCourse courses={data} courseCategory="Farmácia" />
        <ComponentCourse courses={data} courseCategory="Fisioterapia" />
        <ComponentCourse courses={data} courseCategory="Medicina Veterinária" />
        <ComponentCourse courses={data} courseCategory="Nutrição" />
        <ComponentCourse courses={data} courseCategory="Odontologia" />
        <ComponentCourse courses={data} courseCategory="Psicologia" />
      </Container>
    </Page>
  );
};

export default HomeView;
