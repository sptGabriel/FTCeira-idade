import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles,
  MenuItem,
  Radio,
  FormControlLabel,
  RadioGroup
} from '@material-ui/core';
import Page from 'src/components/Page';
import CustomSnackbar from 'src/components/CustomSnackbar';
import api from 'src/service/ApiService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  texto: {
    height: 44
  },
  selectCourse: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
}));

const RegisterView = () => {
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

  const {
    unregister, handleSubmit, control, setValue, getValues
  } = useForm({
    defaultValues: {
      lastName: '',
      firstName: '',
      credentials: {
        email: '',
        password: ''
      },
      phone: '',
      cpf: '',
      birthDate: '',
      role: '',
      iesCourse: ''
    }
  });

  const handleRadio = () => {
    setValue('iesCourse', '', {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const setUser = (data) => {
    console.log(JSON.stringify(data, null, 2));
    api.addUser(data).then((res) => {
      if (res.status === 201) {
        console.log(JSON.stringify(res, null, 2));
        handleOpenSnack('cadastro efetuado com sucesso', 'success');
        setTimeout(() => {
          navigate('/', { replace: false });
        }, 2000);
      } else {
        handleOpenSnack('falha no cadastro', 'error');
        console.log(JSON.stringify(res, null, 2));
      }
    });
  };

  const onSubmit = (data) => {
    if (data.role === 'student') {
      const newData = Object.keys(data).reduce((object, key) => {
        if (key !== 'iesCourse') {
          object[key] = data[key];
        }
        return object;
      }, {});
      console.log(JSON.stringify(newData, null, 2));
      setUser(newData);
    } else {
      console.log(JSON.stringify(data, null, 2));
      setUser(data);
    }
  };

  return (
    <Page
      className={classes.root}
      title="Register"
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
          <form onSubmit={handleSubmit(onSubmit)}>

            <Box mb={3}>
              <Typography
                color="textPrimary"
                variant="h1"
              >
                Criar nova conta
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body1"
              >
                Use email e CPF válidos para criar a nova conta
              </Typography>
            </Box>

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-label="role"
                  {...field}
                >
                  <FormControlLabel
                    value="student"
                    control={(
                      <Radio
                        onChange={handleRadio}
                        required
                      //   onClick={
                      //   setValue('course', '', {
                      //     shouldValidate: true,
                      //     shouldDirty: true
                      //   })
                      //  }
                      />
                    )}
                    label="Quero ser um estudante"
                  />
                  <FormControlLabel value="teacher" control={<Radio required />} label="Quero ser um professor" />
                </RadioGroup>
              )}
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required={getValues('role') === 'teacher'}
                  disabled={getValues('role') === 'student'}
                  select
                  label="Área de conhecimento"
                  variant="outlined"
                >
                  <MenuItem value="">selecione</MenuItem>
                  <MenuItem value="administração">Administração</MenuItem>
                  <MenuItem value="sistemas">Sistemas de Informação</MenuItem>
                  <MenuItem value="direito">Direito</MenuItem>
                </TextField>
              )}
              name="iesCourse"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="Nome"
                  margin="normal"
                  variant="outlined"
                />
              )}
              name="firstName"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="Sobrenome"
                  margin="normal"
                  variant="outlined"
                />
              )}
              name="lastName"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="CPF"
                  margin="normal"
                  variant="outlined"
                />
              )}
              name="cpf"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="Data nascimento"
                  margin="normal"
                  variant="outlined"
                />
              )}
              name="birthDate"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  type="email"
                  label="email"
                  margin="normal"
                  variant="outlined"
                />
              )}
              name="credentials.email"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  label="phone"
                  margin="normal"
                  variant="outlined"
                />
              )}
              name="phone"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  required
                  type="password"
                  label="password"
                  margin="normal"
                  variant="outlined"
                />
              )}
              name="credentials.password"
              control={control}
            />

            <Box my={2}>
              <Button
                color="primary"
                   // disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              //  onClick={() => setUser(values)}
              >
                Inscreva-se agora
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Tem uma conta?
              {' '}
              <Link
                component={RouterLink}
                to="/login"
                variant="body1"
              >
                Entrar
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
