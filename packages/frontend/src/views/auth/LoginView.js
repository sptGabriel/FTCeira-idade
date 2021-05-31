import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import api from 'src/services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [dataUser, setDataUser] = useState({});

  async function getUserData() {
    try {
      const response = await api.get('/users/me');
      localStorage.setItem('userData', JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.message);
      }
    }
  }

  async function signIn(formData) {
    setButtonDisable(true);
    try {
      const { data } = await api.post('/signin', formData,
        {
          Headers: {
            'Content-Type': 'application/json',
          }
        });
      setButtonDisable(false);
      localStorage.setItem('userToken', data.token);
      getUserData();
      navigate('/app/home', { replace: true });
    } catch (error) {
      if (error.response) {
        alert('Dados incorretos: verifique seu E-mail e senha e tente novamente');
        setButtonDisable(false);
      }
    }
  }

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Deve ser um email válido').max(255).required('Email obrigatório'),
              password: Yup.string().max(255).required('Senha obrigatória')
            })}
            onSubmit={(values) => {
              signIn(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h1"
                  >
                    Entrar
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body1"
                  >
                    Faça login na plataforma
                    {' '}
                    <b>FT</b>
                    ER
                    <b>C</b>
                    EIRIDADE
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Senha"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Esqueceu sua senha?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/recover"
                    variant="body1"
                  >
                    Recuperar
                  </Link>
                </Typography>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={buttonDisable}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Faça seu login
                  </Button>
                </Box>

                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Tem conta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="body1"
                  >
                    Criar
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
