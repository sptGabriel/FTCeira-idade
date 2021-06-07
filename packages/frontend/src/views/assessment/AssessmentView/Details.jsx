import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
  const isLocal = localStorage.getItem('selected_assessment');
  const storageAssessment = JSON.parse(localStorage.getItem('selected_assessment'));

  const [values] = useState({
    id: isLocal !== null ? storageAssessment.id : '',
    description: isLocal !== null ? storageAssessment.description : '',
    startDate: isLocal !== null ? momenttz(storageAssessment.startDate).tz('America/Bahia').format('DD/MM/yyyy') : '',
    endDate: isLocal !== null ? momenttz(storageAssessment.endDate).tz('America/Bahia').format('DD/MM/yyyy') : '',
    value: isLocal !== null ? storageAssessment.value : '',
    isActive: isLocal !== null ? storageAssessment.isActive : '',
    questions: []
  });

  // const handleChange = (event) => {
  //   if (event.target.name === 'isActive') {
  //     setValues({
  //       ...values,
  //       [event.target.name]: event.target.checked
  //     });
  //   } else {
  //     setValues({
  //       ...values,
  //       [event.target.name]: event.target.value
  //     });
  //   }
  // };

  useEffect(() => {
    localStorage.setItem('assessment_header', JSON.stringify(values, null, 2));
    console.log(JSON.stringify(values, null, 2));
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
                InputProps={{
                  readOnly: true,
                }}
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
                variant="outlined"
                value={values.startDate.substring(0, 10)}
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className={classes.final_date}
                required
                name="endDate"
                label="Data final"
               // type="date"
                variant="outlined"
                value={values.endDate.substring(0, 10)}
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className={classes.value}
                label="Nota"
                name="value"
                type="number"
                value={values.value}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <FormControlLabel
                className={classes.isActive}
                control={(
                  <Checkbox
                    name="isActive"
                    checked={values.isActive}
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
