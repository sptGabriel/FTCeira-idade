import React from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
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
  nestIndex, control, register, setValue, getValues
}) => {
  const classes = useStyles();

  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions.${nestIndex}.alternatives`
  });

  // console.log('fields;;;;;;;;;;;;;');
  // const f = fields.map((g) => {
  //   return g.answer;
  // });
  // console.log(f);

  const handleChange = (event) => {
    if (event.target.name === 'answer') {
      console.log(event.target.checked);
    //   setValues({
    //     ...values,
    //     [event.target.name]: event.target.checked
    //   });
    // } else {
    //   setValues({
    //     ...values,
    //     [event.target.name]: event.target.value
    //   });
    }
  };

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
                value={item.answer}
                onChange={(e) => {
                  setValue(`questions.${nestIndex}.alternatives.${k}.answer`, e.target.checked);
                }}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                defaultValue={item.answer}
               // checked={item.answer}
              />

              <input
                type="checkbox"
                {...register(`questions.${nestIndex}.alternatives.${k}.answer`)}
                value={item.answer}
                checked={item.answer}
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
