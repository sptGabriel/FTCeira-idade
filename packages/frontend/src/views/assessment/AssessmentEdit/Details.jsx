import 'date-fns';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import momenttz from 'moment-timezone';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  FormControlLabel,
  Checkbox,
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
  //  const isLocal = localStorage.getItem('assessment_register');
  // const storageHeader = JSON.parse(localStorage.getItem('assessment_register'));

  const isLocal = localStorage.getItem('selected_assessment');
  const storageHeader = JSON.parse(localStorage.getItem('selected_assessment'));

  const [values, setValues] = useState({
    description: isLocal !== null ? storageHeader.description : '',
    startDate: isLocal !== null ? storageHeader.startDate : '',
    endDate: isLocal !== null ? storageHeader.endDate : '',
    value: isLocal !== null ? storageHeader.value : '',
    course: isLocal !== null ? storageHeader.course : '',
    isActive: isLocal !== null ? storageHeader.isActive : '',
    questions: []
  });

  console.log(values.endDate);
  console.log(moment(storageHeader.endDate).format('DD/MM/YYYY'));
  console.log(moment(storageHeader.endDate).format('L'));
  console.log(moment.locale());

  console.log(momenttz(storageHeader.endDate).tz('America/Bahia').format('DD/MM/YYYY'));

  const handleChange = (event) => {
    if (event.target.name === 'isActive') {
      setValues({
        ...values,
        [event.target.name]: event.target.checked
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  };

  useEffect(() => {
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
              <FormControlLabel
                className={classes.isActive}
                control={(
                  <Checkbox
                    name="isActive"
                    checked={values.isActive}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
            )}
                label={values.isActive ? 'Avaliação ativa' : 'Ativar avaliação'}
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
