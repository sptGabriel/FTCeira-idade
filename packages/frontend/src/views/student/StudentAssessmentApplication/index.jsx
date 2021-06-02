import {
  Button,
  Grid,
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import {
  useForm,
  useFieldArray,
} from 'react-hook-form';
import Page from 'src/components/Page';
import Details from './Details';
import datas from './data';
import { QuestionCard } from './component';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1,
  },
  card: {
    maxWidth: 1024,
  },
  details: {
    marginBottom: theme.spacing(2)
  },
  buttons: {
    margin: theme.spacing(2)
  }
}));

const StudentAssessmentApplication = () => {
  const classes = useStyles();
  const [tmpResponse, setTmpResponse] = useState([]);
  const loadResponses = localStorage.getItem('assessment_responses') ? JSON.parse(localStorage.getItem('assessment_responses')) : [];

  const {
    control,
    register,
    setValue,
    unregister,
    handleSubmit,
    trigger,
  } = useForm({
    mode: 'handleChange',
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'answers'
  });

  const isInitalRender = useRef(true);

  useEffect(() => {
    if (!fields.length && !isInitalRender.current) {
      trigger('answers');
    }

    if (isInitalRender.current) {
      isInitalRender.current = false;
      const responses = datas.map((response) => (
        {
          id: response.id,
          answer: ''
        }
      ));

      if (loadResponses.answers) {
        append(loadResponses.answers);
        setTmpResponse({ assessment_id: uuid(), student_id: uuid(), answers: loadResponses.answers });
      } else {
        append(responses);
        setTmpResponse({ assessment_id: uuid(), student_id: uuid(), answers: responses });
      }
    }
  }, [fields, register, setValue, unregister, trigger, append]);

  const onSubmit = () => {
    // console.log(JSON.stringify(data, null, 2));
    console.log(JSON.stringify(tmpResponse, null, 2));
  };

  const handleChange = (index, event) => {
    tmpResponse.answers[index].answer = event;
    localStorage.setItem('assessment_responses', JSON.stringify(tmpResponse));
    console.log(tmpResponse.answers[index]);
  };

  return (
    <Page
      className={classes.root}
      title="Avaliação"
    >
      <Container maxWidth={false}>
        <Box mt={3}>

          <Grid item xs={12} className={classes.details}>
            <Details />
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)}>

            {fields.map((question, questionIndex) => (
              <QuestionCard
                key={uuid()}
                name={`answers[${questionIndex}].answer`}
                register={register}
                defaultValue={tmpResponse.answers[questionIndex].answer}
                questioning={datas[questionIndex].questioning}
                // image={datas[questionIndex].image}
                alternatives={datas[questionIndex].alternatives}
                className={datas[questionIndex].type === 'subjetiva' ? classes.card : null}
                onChange={(event) => handleChange(questionIndex, event.target.value)}
              />
            ))}
            <Grid item xs={12} className={classes.buttons}>
              <Grid container justify="flex-start" spacing={2}>
                <Grid item>
                  <Button
                    color="secondary"
                    onClick={handleSubmit}
                    variant="contained"
                    type="submit"
                  >
                    enviar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Page>
  );
};

export default StudentAssessmentApplication;
