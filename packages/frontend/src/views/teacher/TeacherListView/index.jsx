import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import api from 'src/service/ApiService';
import Component from './Component';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TeacherListView = () => {
  const classes = useStyles();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.fetchUsers('teachers').then((res) => {
      console.log(JSON.stringify(res.data, null, 2));
      setTeachers(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Docentes"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Component teachers={teachers} loading={false} />
        </Box>
      </Container>
    </Page>
  );
};

export default TeacherListView;
