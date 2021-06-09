import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import {
  CardContent,
  Card,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel
} from '@material-ui/core';

export function version() {
  return (
    <Typography gutterBottom variant="p" component="p">
      1.0
    </Typography>
  );
}

export function QuestionCard({
  className, questioning, alternatives, register, defaultValue, name, ...rest
}) {
  return (
    <Grid
      item
      xs={12}
      {...rest}
    >
      <Card>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="p">
            {questioning}
          </Typography>
        </CardContent>

        <CardContent>

          <FormControl
            component="fieldset"
            inputprops={{
              readOnly: true,
            }}
          >
            <RadioGroup
              aria-label="answers"
              defaultValue={defaultValue}
            >
              {alternatives && alternatives.map((item) => {
                return (
                  <FormControlLabel
                    {...rest}
                    name={name}
                    value={item.alternative}
                    control={(
                      <Radio inputProps={{ disabled: true, 'aria-label': 'primary checkbox' }} />
                        )}
                    label={item.alternative}
                    key={uuid()}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>

        </CardContent>
      </Card>
    </Grid>
  );
}

QuestionCard.propTypes = {
  className: PropTypes.string,
  register: PropTypes.any,
  questioning: PropTypes.string,
  image: PropTypes.string,
  alternatives: PropTypes.array,
  name: PropTypes.any,
  control: PropTypes.any,
  defaultValue: PropTypes.any,
};
