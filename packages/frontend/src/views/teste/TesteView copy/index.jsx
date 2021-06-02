import React, { useState } from 'react';
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
import StudentPerformanceView from './StudentPerformanceView/Component';
import StudentListView from './StudentListView/Component';
import data from './data';

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
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TesteView = () => {
  const classes = useStyles();
  const [loading] = useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page
      className={classes.root}
      title="Discentes"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <AppBar position="sticky">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Discentes" {...a11yProps(0)} />
              <Tab label="Desempenho" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <StudentListView loading={loading} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <StudentPerformanceView />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  );
};

export default TesteView;
