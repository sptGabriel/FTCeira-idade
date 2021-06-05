import React, { useRef, useCallback, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import api from 'src/service/ApiService';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 310,
    width: 310
  }
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('userData'));
  const hiddenFileInput = useRef(null);
  const [src, setSrc] = useState('/static/images/avatars/avatar.png');
  const [image, setImage] = useState();

  const [values, setValues] = useState({
    id: user ? user.id : '',
    firstName: user ? user.firstName : '',
    lastName: user ? user.lastName : '',
    cpf: user ? user.cpf : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    birthDate: user ? user.birthDate : ''
  });

  const imageChange = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      setSrc(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
    // URL.revokeObjectURL(src);
  };

  const handleButtonClick = () => {
    hiddenFileInput.current.click();
  };

  const prepareObject = useCallback(() => {
    const formData = new FormData();
<<<<<<< HEAD
    formData.append('avatar', image);

    api.editAvatarUser(formData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setImage('');
        // URL.revokeObjectURL(src);
      }
    }).catch((error) => {
      console.log(error);
      // URL.revokeObjectURL(src);
=======
    formData.append('id', user.id);
    formData.append('avatar', values.email);
    formData.append('avatar', image);

    const entries = [...formData.entries()];
    console.log(entries.name);

    const d = [...formData.values()];
    console.log(d);

    api.editAvatarUser(formData).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
>>>>>>> 9a547a72bddddcb7d4a211493534d30ca33214c3
    });
  }, [image]);

  const onSubmit = useCallback(() => {
    console.log(JSON.stringify(values, null, 2));
    api.editUser(values).then((res) => {
      if (res.status === 200) {
        console.log(JSON.stringify(res, null, 2));
        localStorage.setItem('userData', JSON.stringify(values), null, 2);
      }
    }).catch((error) => {
      console.log(error);
    });
  }, [values]);

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

      <Grid container spacing={3}>
        <Grid
          item
          lg={4}
          md={6}
          xs={12}
        >
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <Avatar
                  className={classes.avatar}
                  src={src}
                />
              </Box>
            </CardContent>
            <Divider />
            <CardActions>
<<<<<<< HEAD
              <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleButtonClick}>
                <PhotoCamera style={{ fontSize: 40 }} />
              </IconButton>

=======
>>>>>>> 9a547a72bddddcb7d4a211493534d30ca33214c3
              <Button
                color="primary"
                fullWidth
                variant="contained"
                onClick={prepareObject}
<<<<<<< HEAD
                disabled={!image}
              >
                salvar imagem
              </Button>

=======
              >
                insira uma nova foto
              </Button>
              <Button
                color="primary"
                component="span"
                variant="contained"
                onClick={handleButtonClick}
              >
                Upload
              </Button>
>>>>>>> 9a547a72bddddcb7d4a211493534d30ca33214c3
              <input
                accept="image/*"
                id="button-file"
                onChange={imageChange}
                type="file"
                style={{ display: 'none' }}
                ref={hiddenFileInput}
              />
            </CardActions>
          </Card>
        </Grid>

        <Grid
          item
          lg={8}
          md={6}
          xs={12}
        >
          <Card>
            <CardHeader
              subheader="A informação pode ser editada"
              title="Perfil"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    required
                    label="Nome"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
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
                    label="Sobrenome"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
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
                    disabled
                    required
                    label="CPF"
                    name="cpf"
                    value={values.cpf}
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
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
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
                    label="Telefone"
                    name="phone"
                    onChange={handleChange}
                    value={values.phone}
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
                    label="Aniversário"
                    name="birthDate"
                    onChange={handleChange}
                    value={values.birthDate}
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
                onClick={onSubmit}
              >
                Salvar
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
