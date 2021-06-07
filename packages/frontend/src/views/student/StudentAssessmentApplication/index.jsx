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
import api from 'src/service/ApiService';
import Details from './Details';
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
  const getApplication = localStorage.getItem('selected_application') ? JSON.parse(localStorage.getItem('selected_application')) : [];
  // const getUser = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];

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
      const responses = getApplication.questions.map((response) => (
        {
          questionId: response.id,
          answerText: ''
        }
      ));

      if (loadResponses.answers) {
        append(loadResponses.answers);
        // setTmpResponse({ assessment_id: getApplication.id, student_id: getUser.id, answers: loadResponses.answers });
        setTmpResponse({ answers: loadResponses.answers });
      } else {
        append(responses);
        // setTmpResponse({ assessment_id: getApplication.id, student_id: getUser.id, answers: responses });
        setTmpResponse({ answers: responses });
      }
    }
  }, [fields, register, setValue, unregister, trigger, append]);

  const onSubmit = () => {
    console.log(JSON.stringify(tmpResponse, null, 2));
    api.addApplicationAnswers(getApplication.id, tmpResponse).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleChange = (index, event) => {
    tmpResponse.answers[index].answerText = event;
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
            <Details data={getApplication.description} />
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)}>

            {fields.map((question, questionIndex) => (
              <QuestionCard
                key={uuid()}
                name={`answers[${questionIndex}].answerText`}
                register={register}
                defaultValue={tmpResponse.answers[questionIndex].answerText}
                questioning={getApplication.questions[questionIndex].questioning}
                alternatives={getApplication.questions[questionIndex].alternatives}
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
