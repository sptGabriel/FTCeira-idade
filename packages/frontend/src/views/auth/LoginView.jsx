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
import api from 'src/service/ApiService';
import CustomSnackbar from 'src/components/CustomSnackbar';

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

  useEffect(() => {
    localStorage.clear();
  });

  const getUserCredentials = async () => {
    try {
      const response = await api.me();
      if (response.data) {
        localStorage.setItem('userData', JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = (data) => {
    api.auth(data).then((res) => {
      if (res.data.token && res.status === 200) {
        localStorage.setItem('userToken', res.data.token);
        getUserCredentials();
        navigate('/app/home', { replace: false });
      } else {
        handleOpenSnack('falha no login', 'error');
        console.log(JSON.stringify(res, null, 2));
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <CustomSnackbar
        message={message}
        openStatus={open}
        handleClose={handleCloseSnack}
        timeClose={6000}
        severity={severity}
      />
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
              email: Yup.string().email('Deve ser um email v??lido').max(255).required('Email obrigat??rio'),
              password: Yup.string().max(255).required('Senha obrigat??ria')
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
                    Fa??a login na plataforma
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
                   // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Fa??a seu login
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
