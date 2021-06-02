import React from 'react';
import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Button,
  TextField,
  Grid,
  Card,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import NestedArray from './Component';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Fields({
  control, register, setValue, getValues
}) {
  const classes = useStyles();
  const {
    fields, append, remove, prepend
  } = useFieldArray({
    control,
    name: 'questions'
  });

  //--------------------

  return (
    <>

      <Card>

        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <TextField
                    {...register(`questions.${index}.questioning`)}
                    variant="outlined"
                    defaultValue={item.questioning}
                    placeholder="pergunta"
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>

              {/* ---------------IMAGE--------------------- */}

              {/* <Grid
                item
              >
                <Button
                  className={classes.button}
                  color="primary"
                  component="span"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  imagem
                </Button>

                <IconButton
                  color="primary"
                  component="span"
                  variant="contained"
                >
                  <DeleteIcon />
                </IconButton>

              </Grid> */}

              {/* --------------------------------------------- */}

              <Grid container spacing={3}>
                <Grid item xs>
                  <NestedArray
                    nestIndex={index}
                    {...{
                      control, register, setValue, getValues
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          );
        })}
      </Card>

      <Box
        display="flex"
        justifyContent="flex-end"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box p={1}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              prepend({ questioning: '' });
            }}
            startIcon={<AddIcon />}
          >
            pergunta acima
          </Button>
        </Box>
        <Box p={1}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => {
              append({ questioning: '' });
            }}
            startIcon={<AddIcon />}
          >
            pergunta abaixo
          </Button>
        </Box>
      </Box>

    </>
  );
}

Fields.propTypes = {
  className: PropTypes.string,
  control: PropTypes.any,
  register: PropTypes.any,
  setValue: PropTypes.func,
  getValues: PropTypes.func,
};
