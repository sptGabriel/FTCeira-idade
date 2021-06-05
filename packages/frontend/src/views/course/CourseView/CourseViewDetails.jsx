import React, { useState, useCallback, useEffect } from 'react';
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
  const getCourse = localStorage.getItem('course_home');
  const [course, setCourse] = useState({
    id: '',
    description: '',
    media: '',
    tittle: '',
    shift: '',
    students: '',
  });

  useEffect(() => {
    setCourse({
      id: getCourse ? getCourse.id : '',
      description: getCourse ? getCourse.description : '',
      media: getCourse ? getCourse.media : '',
      tittle: getCourse ? getCourse.tittle : '',
      shift: 'falta essa variavel',
      students: 'falta essa variavel'
    });
  }, []);

  // const [avatar] = useState(course.avatar);
  //--------------------

  const handleSubmit = useCallback(() => {
    console.log(course.tittle, course.description, course.students, course.shift);
  }, [course]);

  return (
    <Container>
      <Grid container spacing={3}>

        <Grid item xs={8}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={course.media}
              title="tittle"
            />
          </CardActionArea>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h1" component="h2">
            {course.tittle}
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            {course.description}
          </Typography>
          <br />
          <Typography variant="body1" component="h1">
            {course.students}
            {' '}
            vagas
          </Typography>
          <br />
          <Typography variant="h2" component="h1">
            {course.shift}
          </Typography>
          <br />
          <Typography variant="body1" component="h1">
            ::: ALTERAR ESSA PÁGINA :::
          </Typography>
          <br />
          <Button
            color="primary"
            variant="outlined"
            onClick={handleSubmit}
          >
            INSCREVA-SE
          </Button>
        </Grid>

      </Grid>
    </Container>
  );
};

export default CourseViewDetails;
