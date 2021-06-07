import React from 'react';
import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  TextField, Checkbox, Grid
} from '@material-ui/core';

const Component = ({
  nestIndex, control, register
}) => {
  const { fields } = useFieldArray({
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
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item>
              <Checkbox
                {...register(`questions.${nestIndex}.alternatives.${k}.answer`)}
                inputProps={{ 'aria-label': 'primary checkbox', disabled: true, }}
                defaultChecked={item.answer}
              />
            </Grid>

          </Grid>
        );
      })}
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
