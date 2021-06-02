import React, { useState, useCallback, useRef } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  CardActionArea,
  Grid,
  TextField,
  makeStyles,
  MenuItem,
  CardMedia,
  Container
} from '@material-ui/core';
import api from 'src/service/ApiService';
import CustomSnackbar from 'src/components/CustomSnackbar';

const useStyles = makeStyles((theme) => ({
  root: {},
  selectStatus: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  selectCourse: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  },
  image: {
    height: 300,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

const CourseRegisterDetails = () => {
  const classes = useStyles();
  const hiddenFileInput = useRef(null);
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

  const [course, setCourse] = useState({
    description: '',
    // avatar: '/static/images/blank.png',
    title: 'não precisa',
    name: '',
    iesCourse: ''
  });

  const [src, setSrc] = useState('/static/images/blank.png');

  const handleChange = (event) => {
    setCourse({
      ...course,
      [event.target.name]: event.target.value
    });
  };

  const imageChange = (event) => {
    setSrc(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = useCallback(() => {
    console.log(JSON.stringify(course, null, 2));
    api.addCourse(course).then((res) => {
      if (res.status === 201) {
        console.log(JSON.stringify(res, null, 2));
        handleOpenSnack('curso registrado com sucesso', 'success');
      } else {
        handleOpenSnack('falha no registro do curso', 'error');
        console.log(JSON.stringify(res, null, 2));
      }
    });
  }, [course]);

  const handleButtonClick = () => {
    hiddenFileInput.current.click();
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
          name="Registrar novo curso"
          subheader="Insira todas as informações necessárias"
          titleTypographyProps={{ variant: 'h4' }}
        />
        <Divider />
        <CardActions>
          <Button
            color="primary"
            component="span"
            variant="contained"
            onClick={handleButtonClick}
          >
            Upload
          </Button>
          <input
            accept="image/*"
            id="button-file"
            onChange={imageChange}
            type="file"
            style={{ display: 'none' }}
            ref={hiddenFileInput}
          />
        </CardActions>
        <CardActionArea>
          <CardMedia
            component="img"
            image={src}
            name="name"
            className={classes.image}
          />
        </CardActionArea>
        <Divider />
        <form
          autoComplete="off"
          noValidate
        >
          <CardContent>
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  id="name"
                  label="Nome"
                  margin="dense"
                  name="name"
                  onChange={handleChange}
                  required
                  value={course.name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  id="description"
                  label="Descrição"
                  margin="dense"
                  multiline
                  name="description"
                  onChange={handleChange}
                  required
                  rows={8}
                  value={course.description}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  className={classes.selectCourse}
                  fullWidth
                  required
                  id="iesCourse"
                  name="iesCourse"
                  onChange={handleChange}
                  select
                  size="small"
                  label="Curso"
                  value={course.iesCourse}
                  variant="outlined"
                >
                  <MenuItem selected value="sistemas">Sistemas de Informação</MenuItem>
                  <MenuItem value="administracao">Administração</MenuItem>
                  <MenuItem value="engenharia">Engenharia Civil</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              onClick={handleSubmit}
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

export default CourseRegisterDetails;