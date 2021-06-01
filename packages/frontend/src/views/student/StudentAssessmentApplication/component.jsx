import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardContent,
  Card,
  Grid,
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
  radio: {
    '& .MuiFormControlLabel-label': {
      fontWeight: 400,
      fontSize: 20,
      letterSpacing: '-0.06px'
    },
  },
  textField: {
    maxWidth: 720,
  }
}));

export function Test() {
  return (<div />);
}

export function QuestionCard({
  className, control, register, questioning, image, alternatives, defaultValue, name, ...rest
}) {
  // export function QuestionCard(className, control, register, questioning, alternatives, name, ...rest) {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      {...rest}
    >
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h1">
            {questioning}
          </Typography>
        </CardContent>

        {/* {image ? (
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

        ) : <div /> } */}

        <CardContent>

          { alternatives.length > 0
            ? (
              <FormControl component="fieldset">
                <RadioGroup aria-label="answers" control={control} defaultValue={defaultValue}>
                  {alternatives.map((item) => {
                    return (
                      <FormControlLabel
                        {...rest}
                        {...register(name)}
                        value={item}
                        control={<Radio />}
                        label={item}
                        key={uuid()}
                        className={classes.radio}
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
                className={classes.textField}
                fullWidth
                control={control}
                defaultValue={defaultValue}
                variant="outlined"
                multiline
                rows={4}
                inputProps={{
                  style: {
                    fontWeight: 400,
                    fontSize: 20,
                    letterSpacing: '-0.06px'
                  }
                }}
                key={uuid()}
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
