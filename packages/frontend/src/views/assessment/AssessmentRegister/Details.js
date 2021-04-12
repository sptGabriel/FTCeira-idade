import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    maxWidth: 1024,
  }
}));

const Details = ({ className, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    description: '',
    initial_date: '',
    end_date: '',
    note: '',
    course: 'Sistemas de Informação',
    classroom: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

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
                rows={4}
                label="Descrição"
                name="description"
                value={values.description}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                required
                label="Data inicial"
                name="initial_date"
                value={values.initial_date}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                required
                label="Data final"
                name="end_date"
                onChange={handleChange}
                value={values.end_date}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nota da avaliação"
                name="note"
                type="number"
                onChange={handleChange}
                value={values.note}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                required
                disabled
                label="Curso"
                name="course"
                onChange={handleChange}
                value={values.course}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                required
                label="Turma COMBO"
                name="classroom"
                onChange={handleChange}
                value={values.classroom}
                variant="outlined"
              />
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Salvar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Details.propTypes = {
  className: PropTypes.string
};

export default Details;
