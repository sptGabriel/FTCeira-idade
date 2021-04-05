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
  Box,
  Container
} from '@material-ui/core';
import Page from 'src/components/Page';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  select: {
    marginTop: theme.spacing(1)
  },
}));

const CourseEditDetails = () => {
  const classes = useStyles();
  const hiddenFileInput = useRef(null);

  // dados do curso selecionado ------------------
  const [course, setCourse] = useState({
    id: uuid(),
    description: 'Descrição do curso 1',
    media: '/static/images/blank.png',
    title: 'Nome do curso 1',
    students: 0,
    shift: 'noturno'
  });

  const [src, setSrc] = useState(course.media);
  //--------------------

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
    console.log(course.title, course.description, course.students, course.shift);
  }, [course]);

  const handleButtonClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Card>
            <CardHeader
              subheader="Todas as informações podem ser editadas posteriormente pelo usuário"
              title="Inserir nova questão"
            />
          </Card>
          <br />
          <Card>
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
                title="title"
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
                      id="title"
                      label="Título"
                      margin="dense"
                      name="title"
                      onChange={handleChange}
                      required
                      value={course.title}
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
                      rows={4}
                      value={course.description}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs
                  >
                    <TextField
                      fullWidth
                      id="students"
                      label="Total de vagas"
                      margin="dense"
                      name="students"
                      onChange={handleChange}
                      required
                      type="number"
                      value={course.students}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs
                  >
                    <TextField
                      className={classes.select}
                      fullWidth
                      required
                      id="shif"
                      name="shift"
                      onChange={handleChange}
                      select
                      size="small"
                      label="Turno"
                      value={course.shift}
                      variant="outlined"
                    >
                      <MenuItem value="" />
                      <MenuItem value="matutino">Matutino</MenuItem>
                      <MenuItem value="vespertino">Vespertino</MenuItem>
                      <MenuItem value="noturno">Noturno</MenuItem>
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
      </Box>
    </Page>
  );
};

CourseEditDetails.propTypes = {
};

export default CourseEditDetails;
