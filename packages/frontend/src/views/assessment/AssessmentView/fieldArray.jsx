import React from 'react';
import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  TextField,
  Grid,
  Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NestedArray from './Component';

const useStyles = makeStyles((theme) => ({
  questioning: {
    marginRight: theme.spacing(2),
  },
}));

export default function Fields({
  control, register, setValue, getValues
}) {
  const classes = useStyles();
  const {
    fields
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
                <Grid item xs className={classes.questioning}>
                  <TextField
                    {...register(`questions.${index}.questioning`)}
                    variant="outlined"
                    defaultValue={item.questioning}
                    placeholder="pergunta"
                    fullWidth
                    multiline
                    rows={3}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
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
