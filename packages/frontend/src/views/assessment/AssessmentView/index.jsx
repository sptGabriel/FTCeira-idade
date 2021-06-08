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
import api from 'src/service/ApiService';
// import datas from './assessment_data';
// import studentAssessmentAnswers from './student_assessment_answers';
// import { QuestionCard } from './component';

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

const AssessmentView = () => {
  const classes = useStyles();
  const [tmpResponse, setTmpResponse] = useState([]);

  const [arrayDetails, setArrayDetails] = useState({
    id: '',
    description: '',
    startDate: '',
    endDate: '',
    value: 0,
    questions: [
      {
        id: '',
        image: null,
        questioning: '',
        alternatives: []
      },
    ]
  });

  useEffect(() => {
    api.fetchAssessments().then((res) => {
      if (res.status === 200) {
        // console.log(JSON.stringify(res.data, null, 2));
        console.log(res.data);
        setArrayDetails({
          id: res.data[0].id,
          description: res.data[0].description,
          startDate: res.data[0].startDate,
          endDate: res.data[0].endDate,
          value: res.data[0].value,
          questions: res.data[0].questions
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    // console.log(arrayDetails);
    console.log(JSON.stringify(arrayDetails, null, 2));
  }, [arrayDetails]);
  // useEffect(() => {
  //   api.fetchAssessments().then((res) => {
  //     console.log(res);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }, []);

  const {
    control,
    register,
    setValue,
    unregister,
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
      // const studentresponses = studentAssessmentAnswers.map((response) => (
      const studentresponses = arrayDetails.questions.map((response) => (
        response
      ));
      append(studentresponses);
      setTmpResponse({ answers: studentresponses });
      console.log(tmpResponse);
    }
  }, [fields, register, setValue, unregister, trigger, append]);

  const a = [];
  const arrayQuestions = [];
  fields.map((question, questionIndex) => (
    <div key={uuid()}>{question}</div>

    //   <QuestionCard
    //     key={uuid()}
    //     name={`answers[${questionIndex}].answer`}
    //     register={register}
    //     defaultValue={tmpResponse.answers[questionIndex].answer}
    //     questioning={res.questions[questionIndex].questioning}
    //     image={res.questions[questionIndex].image}
    //     alternatives={res.questions[questionIndex].alternatives}
    //     className={res.questions[questionIndex].type === 'subjetiva' ? classes.card : null}
    //  />

    // datas.forEach((res) => {
    //   arrayQuestions.push(
    //     <div key={uuid()}>res</div>
    //   <QuestionCard
    //     key={uuid()}
    //     name={`answers[${questionIndex}].answer`}
    //     register={register}
    //     defaultValue={tmpResponse.answers[questionIndex].answer}
    //     questioning={res.questions[questionIndex].questioning}
    //     image={res.questions[questionIndex].image}
    //     alternatives={res.questions[questionIndex].alternatives}
    //     className={res.questions[questionIndex].type === 'subjetiva' ? classes.card : null}
    //  />
    //   );
    // })
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
                      {arrayDetails.description}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <b>data inicial:</b>
                      {' '}
                      {arrayDetails.startDate}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <b>data final:</b>
                      {' '}
                      {arrayDetails.endDate}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <b>valor máximo:</b>
                      {' '}
                      {arrayDetails.value}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
            </Card>
          </Grid>

          <form>
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
              {/* {arrayQuestions} */}
            </div>

          </form>
        </Box>
      </Container>
    </Page>
  );
};

export default AssessmentView;
