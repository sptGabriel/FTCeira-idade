import React, { useState, useEffect } from 'react';
import {
  Button,
  CardMedia,
  CardActionArea,
  Grid,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  info: {
    marginTop: theme.spacing(5),
  },
  button: {
    marginTop: theme.spacing(10),
    height: 66,
    fontSize: 20,
  }
}));

const CourseViewDetails = () => {
  const classes = useStyles();
  const getUser = JSON.parse(localStorage.getItem('userData'));
  const [user] = useState(getUser.role);
  const getCourse = JSON.parse(localStorage.getItem('course_home'));
  const [course, setCourse] = useState({
    id: '',
    description: '',
    media: '',
    tittle: ''
  });
  useEffect(() => {
    console.log(user);
    setCourse({
      id: getCourse ? getCourse.id : '',
      description: getCourse ? getCourse.description : '',
      media: '/static/images/courses/si.jpg', // getCourse ? getCourse.media : '',
      tittle: getCourse ? getCourse.tittle : '',
    });
  }, []);

  const {
    handleSubmit, control, setValue, watch
  } = useForm({
    defaultValues: {
      courseId: getCourse ? getCourse.id : '',
      shift: ''
    }
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div>
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

        <Grid
          item
        >
          <Grid
            container
            spacing={10}
            sx={2}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item className={classes.info}>
              <Typography variant="h1" component="h2">
                {course.tittle}
              </Typography>
              <br />
              <Typography variant="h3" component="h1">
                Descrição:
                {' '}
                {course.description}
              </Typography>
            </Grid>
            <Grid item>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h2" component="h1">
                  Defina o turno desejado
                </Typography>
                <br />
                <Controller
                  name="shift"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      aria-label="shift"
                      {...field}
                    >
                      <FormControlLabel
                        value="matunino"
                        control={(
                          <Radio
                            onChange={
                            (item) => { setValue('shift', item.target.value); }
                          }
                            required
                          />
                    )}
                        label={<Typography variant="h3" component="h1">Matutino</Typography>}
                      />
                      <FormControlLabel
                        value="vespertino"
                        control={(
                          <Radio
                            required
                            onChange={
                              (item) => { setValue('shift', item.target.value); }
                            }
                          />
                      )}
                        label={<Typography variant="h3" component="h1">Vespertino</Typography>}
                      />
                    </RadioGroup>
                  )}
                />
                <Grid item>
                  <Button
                    disabled={user !== 'student'}
                    color="primary"
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth
                    className={classes.button}
                  >
                    INSCREVA-SE
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CourseViewDetails;
