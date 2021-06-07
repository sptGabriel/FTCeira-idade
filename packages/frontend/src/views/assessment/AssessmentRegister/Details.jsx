import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    maxWidth: 1024,
  },
  startDate: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  final_date: {
    marginLeft: theme.spacing(2),
  },
  value: {
    maxWidth: 110,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  nquestions: {
    maxWidth: 150,
  },
  quiz: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  }
}));

const Details = ({ className, ...rest }) => {
  const classes = useStyles();
  const storageCourse = JSON.parse(localStorage.getItem('selected_course'));

  const [values, setValues] = useState({
    name: 'NAO PRECISA',
    description: '',
    startDate: '',
    endDate: '',
    value: 0,
    courseId: storageCourse ? storageCourse.id : '',
    isActive: true,
    questions: []
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    console.log(JSON.stringify(values, null, 2));
    localStorage.setItem('assessment_header', JSON.stringify(values, null, 2));
  }, [values]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Avaliação"
          subheader="Favor preencha todos os dados do formulário"
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
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                label="Descrição"
                name="description"
                value={values.description}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
            >
              <TextField
                required
                name="startDate"
                label="Data inicial"
                type="date"
                variant="outlined"
                value={values.startDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className={classes.final_date}
                required
                name="endDate"
                label="Data final"
                type="date"
                variant="outlined"
                value={values.endDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className={classes.value}
                label="Nota"
                name="value"
                type="number"
                onChange={handleChange}
                value={values.value}
                variant="outlined"
              />
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

Details.propTypes = {
  className: PropTypes.string
};

export default Details;
