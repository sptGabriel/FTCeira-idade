import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import api from 'src/service/ApiService';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Grid,
  TextField,
  makeStyles,
  MenuItem,
  Container
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import CustomSnackbar from 'src/components/CustomSnackbar';

const useStyles = makeStyles((theme) => ({
  root: {},
  selectMax: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  selectShift: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  },
}));

const ClassRoomRegisterDetails = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleOpenSnack = (text, type) => {
    setMessage(text);
    setSeverity(type);
    setOpen(true);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      setOpen(false);
      return;
    }
    setOpen(false);
  };

  const [results, setResults] = useState([]);
  useEffect(() => {
    api.fetchCourses().then((res) => {
      if (res.status === 201) {
        console.log(JSON.stringify(res.data, null, 2));
        setResults(res.data);
      }
    });
  }, []);

  const {
    handleSubmit, control, watch, reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      cod: '',
      max: '',
      shift: '',
      startDate: '01-02-2020', // necessário?
      endDate: '02-03-2020', // necessário?
      courseId: ''
    }
  });

  watch((data) => {
    console.log(JSON.stringify(data, null, 2));
  });

  const onSubmit = (data) => {
    api.addClassRoom(data).then((res) => {
      if (res.status === 201) {
        handleOpenSnack('registro da classe efetuado com sucesso', 'success');
        reset();
      }
    }).catch((error) => {
      handleOpenSnack('falha no registro da classe', 'error');
      console.log(JSON.stringify(data, null, 2));
    });
  };

  return (
    <Container maxWidth="sm">
      <CustomSnackbar
        message={message}
        openStatus={open}
        handleClose={handleCloseSnack}
        timeClose={6000}
        severity={severity}
      />
      <Card>
        <CardHeader
          title="Registrar nova turma"
          subheader="Insira todas as informações necessárias"
          titleTypographyProps={{ variant: 'h4' }}
        />
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                xs={12}
              >
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      label="Código"
                      margin="normal"
                      variant="outlined"
                    />
                  )}
                  name="cod"
                  control={control}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      select
                      label="Curso"
                      variant="outlined"
                    >
                      <MenuItem key={uuid()} value="">selecione</MenuItem>
                      {results.map((result) => (
                        <MenuItem key={uuid()} value={result.id}>{result.tittle}</MenuItem>
                      ))}
                    </TextField>
                  )}
                  name="courseId"
                  control={control}
                />
              </Grid>
              <Grid
                item
                xs
              >
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      className={classes.selectMax}
                      label="Vagas"
                      type="number"
                      margin="normal"
                      variant="outlined"
                    />
                  )}
                  name="max"
                  control={control}
                />
              </Grid>

              <Grid
                item
                xs
              >
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      select
                      label="Turno"
                      variant="outlined"
                      className={classes.selectShift}
                    >
                      <MenuItem value="">selecione</MenuItem>
                      <MenuItem value="matutino">Matutino</MenuItem>
                      <MenuItem value="vespertino">Vespertino</MenuItem>
                    </TextField>
                  )}
                  name="shift"
                  control={control}
                />

              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              type="submit"
              variant="contained"
            >
              Salvar
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};

export default ClassRoomRegisterDetails;
