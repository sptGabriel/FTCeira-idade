import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

// import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  handPointer: {
    cursor: 'pointer'
  }
}));

const Component = ({ className, course, ...rest }) => {
  const classes = useStyles();
  // const navigate = useNavigate();
  // const clickActions = () => {
  //  navigate('', { replace: false });
  // };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="240"
          image={course.media}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {course.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {course.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {course.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          inscreva-se
        </Button>
      </CardActions>
    </Card>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  course: PropTypes.any.isRequired
};

export default Component;
