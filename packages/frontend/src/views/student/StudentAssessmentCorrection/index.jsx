import {
  Button,
  Grid,
  Box,
  Typography,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Container,
  makeStyles,
  TextField
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
import datas from './assessment_data';
import studentAssessmentAnswers from './student_assessment_answers';
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
  gridFooter: {
    margin: theme.spacing(2),
  },
  button: {
    height: 55
  },
  note: {
    width: 100
  }
}));

const StudentAssessmentCorrection = () => {
  const classes = useStyles();
  const [tmpResponse, setTmpResponse] = useState([]);
  const [student] = useState('Aaa Bbbbbbb Cccc'); // pegar do local storage/autenticação
  const arrayQuestions = [];
  const [arrayDetails] = useState({
    id: datas[0].id,
    description: datas[0].description,
    initial_date: datas[0].initial_date,
    end_date: datas[0].end_date,
    note: datas[0].note,
  });

  const {
    control,
    register,
    setValue,
    unregister,
    handleSubmit,
    trigger,
  } = useForm();

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

      // const studentresponses = studentAssessmentAnswers[0].answers.map((response) => (
      const studentresponses = studentAssessmentAnswers.map((response) => (
        response
      ));
      append(studentresponses);
      setTmpResponse({ answers: studentresponses });
      // setTmpResponse({ studentresponses });
    }
  }, [fields, register, setValue, unregister, trigger, append]);

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  fields.map((question, questionIndex) => (

    datas.forEach((res) => {
      arrayQuestions.push(
        <QuestionCard
          key={uuid()}
          name={`answers[${questionIndex}].answer`}
          register={register}
          defaultValue={tmpResponse.answers[questionIndex].answer}
          questioning={res.questions[questionIndex].questioning}
          image={res.questions[questionIndex].image}
          alternatives={res.questions[questionIndex].alternatives}
          className={res.questions[questionIndex].type === 'subjetiva' ? classes.card : null}
        />
      );
    })
  ));

  return (
    <Page
      className={classes.root}
      title="Correção"
    >
      <Container maxWidth={false}>
        <Box mt={3}>

          <Grid item xs={12} className={classes.details}>
            <Card>
              <CardHeader
                title="Correção de Avaliação"
                // subheader=""
                titleTypographyProps={{ variant: 'h4' }}
              />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <Typography variant="body1" component="p">
                      <b>descrição:</b>
                      {' '}
                      dd
                      {arrayDetails.description}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <b>data inicial:</b>
                      {' '}
                      {arrayDetails.initial_date}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <b>data final:</b>
                      {' '}
                      {arrayDetails.end_date}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <b>nota máxima:</b>
                      {' '}
                      {arrayDetails.note}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <b>discente:</b>
                      {' '}
                      {student}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
            </Card>
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* {fields.map((question, questionIndex) => (
              <QuestionCard
                key={uuid()}
                name={`answers[${questionIndex}].answer`}
                register={register}
                defaultValue={tmpResponse.answers[questionIndex].answer}
                questioning={datas[questionIndex].questioning}
                image={datas[questionIndex].image}
                alternatives={datas[questionIndex].alternatives}
                className={datas[questionIndex].type === 'subjetiva' ? classes.card : null}
              />
            ))} */}

            {/* {fields.forEach((teste) => {
               console.log(JSON.stringify(teste, null, 2)); //respostas
               console.log(JSON.stringify(datas, null, 2));
            })} */}

            <div className="App">
              {arrayQuestions}
            </div>

            <Grid item xs={12} className={classes.gridFooter}>
              <Grid container justify="flex-start" spacing={2}>
                <Grid item>
                  <TextField name="note" label="Nota" placeholder="100.00" variant="outlined" className={classes.note} />
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    color="secondary"
                    onClick={handleSubmit}
                    variant="contained"
                    type="submit"
                  >
                    confirmar correção
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

export default StudentAssessmentCorrection;
