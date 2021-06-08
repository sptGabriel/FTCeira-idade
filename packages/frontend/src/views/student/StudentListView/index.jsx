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
  },
}));

const StudentListView = () => {
  const classes = useStyles();
  const [loading] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.fetchUsers('students').then((res) => {
      console.log(JSON.stringify(res.data, null, 2));
      setStudents(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Discentes"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Component students={students} loading={loading} />
        </Box>
      </Container>
    </Page>
  );
};

export default StudentListView;
