import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardContent,
  Card,
  Grid,
  CardMedia,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  media: {
    maxWidth: 512,
    padding: theme.spacing(4)
  },
}));

export function version() {
  return (
    <Typography gutterBottom variant="p" component="p">
      1.0
    </Typography>
  );
}

export function QuestionCard({
  className, control, register, questioning, image, alternatives, defaultValue, name, ...rest
}) {
  const classes = useStyles();

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

        {image ? (
        // <Box
        //   display="flex"
        //   justifyContent="center"
        //   alignItems="center"
        // >
          <CardMedia
            className={classes.media}
            component="img"
            alt="image"
            image={image}
            title="image"
          />

        ) : <div /> }

        <CardContent>

          { alternatives.length > 0
            ? (
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
                  {alternatives.map((item) => {
                    return (
                      <FormControlLabel
                        {...rest}
                        {...register(name)}
                        value={item}
                        control={(
                          <Radio inputProps={{ disabled: true, 'aria-label': 'primary checkbox' }} />
                        )}
                        label={item}
                        key={uuid()}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            )
            : (
              <TextField
                {...rest}
                {...register(name)}
                fullWidth
                control={control}
                defaultValue={defaultValue}
                variant="outlined"
                multiline
                rows={3}
                className={className}
                key={uuid()}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
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
