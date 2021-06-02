import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AssessmentListView from 'src/views/assessment/AssessmentListView/index';
import StudentAssessmentListView from './StudentAssessmentListView';
import CourseEdit from './Component';
import CoursePerformanceView from '../CoursePerformanceView';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(-10),
    paddingTop: theme.spacing(0)
  },
  shadow: {
    borderTop: '1px solid #7ab6f3',
    marginBefore: 'auto',
    marginAfter: 'auto',
    marginStart: 'auto',
    marginEnd: 'auto',
  },
  question: {
    marginTop: theme.spacing(0),
    // minHeight: '100%',
    // paddingBottom: theme.spacing(-10),
  }
}));

const Component = () => {
  const classes = useStyles();
  const [value, setValue] = useState(
    localStorage.getItem('tab_course') ? parseFloat(localStorage.getItem('tab_course')) : 0
  );

  const handleChange = useCallback((event, newValue) => {
    localStorage.setItem('tab_course', newValue);
    setValue(newValue);
  }, []);

  return (
    <Page
      className={classes.root}
      title="Curso"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <AppBar position="sticky" className={classes.shadow}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Curso" {...a11yProps(0)} />
              <Tab label="Desempenho" {...a11yProps(1)} />
              <Tab label="Avaliações do curso" {...a11yProps(2)} />
              <Tab label="Avaliações realizadas" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <CourseEdit />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CoursePerformanceView title="Desempenho da curso" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AssessmentListView title="Avaliações do curso" />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <StudentAssessmentListView title="Avaliações realizadas" />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  );
};

export default Component;
