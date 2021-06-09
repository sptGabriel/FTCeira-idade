import {
  Grid,
  Box,
  Typography,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Container,
  makeStyles,
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import Page from 'src/components/Page';
import api from 'src/service/ApiService';
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
  value: {
    width: 100
  }
}));

const AssessmentView = () => {
  const classes = useStyles();
  const arrayQuestions = [];
  const isMountedRef = useRef(null);

  // const [arrayDetails] = useState({
  //   id: datas[0].id,
  //   description: datas[0].description,
  //   startDate: datas[0].startDate,
  //   endDate: datas[0].endDate,
  //   value: datas[0].value,
  //   questions: datas[0].questions
  // });

  const [arrayValues, setArrayValues] = useState({
    id: '',
    description: '',
    startDate: '',
    endDate: '',
    value: 0,
    questions: []
  });

  useEffect(() => {
    isMountedRef.current = true;

    api.fetchAssessmentsAll().then((res) => {
      if (res.status === 200) {
        setArrayValues({
          id: res.data[0].id,
          description: res.data[0].description,
          startDate: res.data[0].startDate,
          endDate: res.data[0].endDate,
          value: res.data[0].value,
          questions: res.data[0].questions,
        });
        isMountedRef.current = false;
      } else {
        console.log('erro');
      }
      isMountedRef.current = false;
    }).catch((error) => {
      console.log(error);
      isMountedRef.current = false;
    });
  }, []);

  //----------------

  const tmpAnswers = [];
  const t = [];
  const [questionsTemplate, setQuestionsTemplate] = useState([]);
  useEffect(() => {
    isMountedRef.current = true;
    // eslint-disable-next-line array-callback-return
    arrayValues.questions.map((e) => {
      e.alternatives.forEach((elem) => {
        setQuestionsTemplate([...questionsTemplate, elem]);
      });
    });
    console.log(JSON.stringify(questionsTemplate[0].answer, null, 2));
    // const json = { ...tmpAnswers };
    // setQuestionsTemplate({ answers: mergedArray.filter((e) => e.answer === true) });
    // for (let i = 0; i < tmpAnswers.length; i++) {
    // if (tmpAnswers[i].answer === false) {
    // tmpAnswers.splice(i, 1);
    // console.log(tmpAnswers[i].answer);
    // }
    // }
    // setQuestionsTemplate(tmpAnswers);
    // console.log(JSON.stringify(questionsTemplate[0].answer, null, 2));
    isMountedRef.current = false;
    //-----
  }, [arrayValues]);

  //----------------
  const teste = [
    {
      id: '9c866d80-bf54-4e1d-849d-58e886b0d632',
      answer: true,
      alternative: 'a1 a1 a1'
    },
    {
      id: 'e7cb0e43-4c8c-4373-9ed2-9e3c99fcbe7c',
      answer: true,
      alternative: 'c2 c2 c2'
    }
  ];

  arrayValues.questions.map((question, questionIndex) => (
    arrayQuestions.push(
      <QuestionCard
        key={uuid()}
        name={`answers[${questionIndex}].answer`}
        // defaultValue={tmpAnswers[questionIndex].alternative}
        defaultValue={teste[questionIndex].alternative}
        // questioning={`${question.questioning}${questionIndex}`}
        alternatives={question.alternatives}
      />
    )
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
                      {arrayValues.description}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <b>data inicial:</b>
                      {arrayValues.startDate}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <b>data final:</b>
                      {arrayValues.endDate}
                    </Typography>
                    <Typography variant="body1" component="p">
                      <b>nota máxima:</b>
                      {arrayValues.value}
                    </Typography>

                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
            </Card>
          </Grid>

          <form>
            <div className="App">
              {arrayQuestions}
            </div>
          </form>
        </Box>
      </Container>
    </Page>
  );
};

export default AssessmentView;
