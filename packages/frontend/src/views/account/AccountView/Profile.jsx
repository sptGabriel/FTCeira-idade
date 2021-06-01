import React from 'react';
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

// dados do usuário logado
const user = {
  avatar: '/static/images/avatars/avatar.png',
  name: 'Aaa Bbb',
  email: 'usuario@ftc.edu.br'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();

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
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="contained"
        >
          insira uma nova foto
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
