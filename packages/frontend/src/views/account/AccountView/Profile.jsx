import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import api from 'src/service/ApiService';

// dados do usuário logado
// const user = {
//   avatar: '/static/images/avatars/avatar.png',
//   name: '',
//   email: ''
// };

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 310,
    width: 310
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const hiddenFileInput = useRef(null);
  const [src, setSrc] = useState('/static/images/avatars/avatar.png');
  const [image, setImage] = useState();

  const imageChange = (event) => {
    setSrc(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const teste = useCallback(() => {
    const formData = new FormData();
    formData.append('avatar', image);

    const entries = [...formData.entries()];
    console.log(entries.File.name);
    console.log(entries.File.name);

    const values = [...formData.values()];
    console.log(values);

    // api.editAvatarUser(image).then((res) => {
    //   console.log(res);
    // }).catch((error) => {
    //   console.log(error);
    // });
  }, [image]);

  const handleButtonClick = () => {
    hiddenFileInput.current.click();
  };

  return (
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
          {/* <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            xxxx
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            zzzzz
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          onClick={teste}
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
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
