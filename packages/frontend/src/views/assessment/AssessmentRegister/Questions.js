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
// import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Checkbox, Grid, TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  note: {
    maxWidth: 140,
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2)
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

const QuestionCard = ({
  className, question, ...rest
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [checked, setChecked] = useState(false);
  const [questions, setQuestions] = useState(question);
  // const [questions, setQuestions] = useState({
  //   id: '',
  //   questioning: '',
  //   type: '',
  //   alternatives: [],
  //   answer: '',
  //   course: '',
  //   note: ''
  // });

  const checkSelected = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    setQuestions({
      ...questions,
      [event.target.name]: event.target.value,
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid
      item
      xs={12}
      className={classes.root}
      {...rest}
    >

      <Card>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="p">
            {questions.questioning}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Checkbox
            checked={checked}
            onChange={checkSelected}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          {/* <IconButton aria-label="favorites">
            <FavoriteIcon />
          </IconButton> */}
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <Typography aria-label="type">
            {question.type}
          </Typography>
          <TextField
            className={classes.note}
            label="valor da questão"
            name="note"
            type="number"
            onChange={handleChange}
            value={questions.note}
          />
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="expanded"
            disabled={questions.type === 'subjetiva'}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            { questions.alternatives.length > 0
              ? (
                <div>
                  {questions.alternatives.map((item) => {
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

  );
};

QuestionCard.propTypes = {
  className: PropTypes.string,
  question: PropTypes.object.isRequired
};

export default QuestionCard;
