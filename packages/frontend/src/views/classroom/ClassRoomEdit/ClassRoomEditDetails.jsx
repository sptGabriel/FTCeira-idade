import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Grid,
  TextField,
  Box,
  makeStyles,
  MenuItem,
  Container
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
// import CustomSnackbar from 'src/components/CustomSnackbar';
// import api from 'src/service/ApiService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
  },
  selectMax: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  selectShift: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  },
}));

const ClassRooomEditDetails = () => {
  const classes = useStyles();
  // const [open, setOpen] = useState(false);
  // const [message, setMessage] = useState('');
  // const [severity, setSeverity] = useState('');

  // const handleOpenSnack = (text, type) => {
  //   setMessage(text);
  //   setSeverity(type);
  //   setOpen(true);
  // };
  // const handleCloseSnack = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     setOpen(false);
  //     return;
  //   }
  //   setOpen(false);
  // };

  // courses
  //  const [courses, setCourses] = useState([]);
  // useEffect(() => {
  //   api.fetchCourses().then((res) => {
  //     if (res.status === 201) {
  //       // console.log(JSON.stringify(res.data, null, 2));
  //       setCourses(res.data);
  //     } else {
  //       setCourses([]);
  //     }
  //   });
  // }, []);

  const storageClass = JSON.parse(localStorage.getItem('selected_class'));

  const {
    handleSubmit, control, watch
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      cod: storageClass ? storageClass.code : '',
      max: storageClass ? storageClass.students : '',
      shift: storageClass ? storageClass.shift : '',
      startDate: '01-02-2020', // necessário?
      endDate: '02-03-2020', // necessário?
      courseId: storageClass ? storageClass.course.id : '',
    }
  });

  watch((data) => {
    console.log(JSON.stringify(data, null, 2));
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    // api.editClassRoom(data).then((res) => {
    // console.log(JSON.stringify(res, null, 2));
    // if (res.status === 201) {
    // handleOpenSnack('registro da classe efetuado com sucesso', 'success');
    //    }
    // }).catch((error) => {
    //  handleOpenSnack('falha no registro da classe', 'error');
    // console.log(JSON.stringify(error, null, 2));
    // });
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          title="Editar turma"
          subheader="Todas as informações disponíveis podem ser editadas"
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
                <TextField
                  fullWidth
                  required
                  disabled
                  label="Curso"
                  variant="outlined"
                  name="course"
                  defaultValue={storageClass.course.tittle}
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
            <Box flexGrow={1}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
              >
                Salvar
              </Button>
            </Box>
            <Box>
              <Button
                color="secondary"
                onClick={handleSubmit}
                variant="contained"
              >
                Excluir turma
              </Button>
            </Box>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};

ClassRooomEditDetails.propTypes = {
};

export default ClassRooomEditDetails;
