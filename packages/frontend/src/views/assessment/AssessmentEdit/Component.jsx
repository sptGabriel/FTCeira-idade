import React from 'react';
import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  TextField, Button, Checkbox, Grid
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Component = ({
  nestIndex, control, register, setValue
}) => {
  const classes = useStyles();

  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions.${nestIndex}.alternatives`
  });

  return (
    <>
      {fields.map((item, k) => {
        return (
          <Grid
            container
            spacing={3}
            key={item.id}
          >
            <Grid item xs>
              <TextField
                fullWidth
                variant="outlined"
                {...register(`questions.${nestIndex}.alternatives.${k}.alternative`)}
                defaultValue={item.alternative}
                placeholder="alternativa"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item>
              <Checkbox
                {...register(`questions.${nestIndex}.alternatives.${k}.answer`)}
                onChange={(e) => {
                  setValue(`questions.${nestIndex}.alternatives.${k}.answer`, e.target.checked);
                }}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                defaultChecked={item.answer}
              />
            </Grid>
            <Grid item>
              <IconButton
            //  className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => remove(k)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>

          </Grid>
        );
      })}

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => append({
          alternative: '',
          answer: false
        })}
        startIcon={<AddIcon />}
      >
        alternativa
      </Button>

    </>
  );
};

export default Component;

Component.propTypes = {
  className: PropTypes.string,
  nestIndex: PropTypes.any,
  control: PropTypes.any,
  register: PropTypes.any,
  setValue: PropTypes.func,
  getValues: PropTypes.func,
};
