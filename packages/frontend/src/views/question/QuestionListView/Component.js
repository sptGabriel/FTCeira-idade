import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Checkbox, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    marginTop: theme.spacing(2),
    maxWidth: '600px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const QuestionCard = ({ className, question, ...rest }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const [checked, setChecked] = useState(false);
  const [items, setItems] = useState(0);

  const handleChange = (event) => {
    if (event.target.checked === true) {
      setItems(Math.max(items + 1, 0));
    } else { setItems(Math.max(items - 1, 0)); }
    setChecked(event.target.checked);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.root} {...rest}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="p">
              {question.questioning}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <IconButton aria-label="favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <Typography aria-label="type">
              {question.type}
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="expanded"
              disabled={question.type === 'subjetiva'}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              { question.alternatives.length > 0
                ? (
                  <div>
                    {question.alternatives.map((item) => {
                      return (<Typography key={uuid()}>{ item }</Typography>);
                    })}
                  </div>
                )
                : (
                  <div />
                )}

            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </div>
  );
};

QuestionCard.propTypes = {
  className: PropTypes.string,
  question: PropTypes.object.isRequired
};

export default QuestionCard;
