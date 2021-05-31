import React, { useState, useCallback } from 'react';
import {
  Button,
  CardActionArea,
  Grid,
  Container,
  CardMedia,
  Typography
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';

const CourseViewDetails = () => {
  // dados do curso selecionado ------------------
  const [course] = useState({
    id: uuid(),
    description: 'O Curso de Informática Básica e Avançada da Intensiva Cursos foi desenvolvido cuidadosamente para ensinar desde os conceitos básicos da informática, passando pelo Word (editor de textos) e Excel (editor de planilhas) e chegando até a introdução às redes de computador.',
    image: '/static/images/course.jpg',
    title: 'Windows 10 e Office 365',
    students: 28,
    shift: 'noturno'
  });

  const [image] = useState(course.image);
  //--------------------

  const handleSubmit = useCallback(() => {
    console.log(course.title, course.description, course.students, course.shift);
  }, [course]);

  const container = {
    marginTop: '10px',
    // backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px'
  };

  return (
    <Container>
      <Grid container spacing={3}>

        <Grid item xs={8}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={image}
              title="title"
            />
          </CardActionArea>
        </Grid>

        <Container style={container} item xs={4}>
          <Typography variant="h1" component="h2">
            {course.title}
          </Typography>
          <br />
          <Typography style={{ width: '60%' }} variant="body1" component="p">
            {course.description}
          </Typography>
          <br />
          <Button style={{ backgroundColor: '#434592', color: '#fff', marginRight: '5px' }} disabled>
            {course.shift}
          </Button>
          <Button style={{ backgroundColor: '#434592', color: '#fff', marginRight: '5px' }} disabled>
            {course.students}
            {' '}
            vagas
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleSubmit}
            style={{ backgroundColor: '#0A91F9', color: '#fff' }}
          >
            INSCREVA-SE
          </Button>
          <br />
        </Container>

      </Grid>
    </Container>
  );
};

export default CourseViewDetails;
