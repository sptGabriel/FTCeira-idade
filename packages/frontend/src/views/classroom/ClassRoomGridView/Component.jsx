import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BarChartIcon from '@material-ui/icons/BarChart';
import PeopleIcon from '@material-ui/icons/People';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AssessmentIcon from '@material-ui/icons/DescriptionOutlined';
import { useNavigate } from 'react-router-dom';
import CustomTooltip from '../../../utils/CustomTooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  handPointer: {
    cursor: 'pointer'
  }
}));

const Component = ({ className, classroom, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const clickActions = (action) => {
    localStorage.setItem('selected_class', JSON.stringify(classroom, null, 2));
    switch (action) {
      case 'chart':
        navigate('/app/classroom-performance', { replace: false });
        break;
      case 'edit':
        navigate('/app/classroom-edit', { replace: false });
        break;
      case 'delete':
        navigate('/app/classroom-delete', { replace: false });
        break;
      case 'assessment':
        navigate('/app/assessments', { replace: false });
        break;
      case 'question':
        navigate('/app/questions', { replace: false });
        break;
      default:
        break;
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        />
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {classroom.code}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {classroom.course.name}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <CustomTooltip title="turno">
              <AccessTimeIcon
                className={classes.statsIcon}
                color="action"
              />
            </CustomTooltip>
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {classroom.shift}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <CustomTooltip title="desempenho">
              <BarChartIcon
                className={clsx(classes.statsIcon, classes.handPointer)}
                color="action"
                onClick={() => clickActions('chart')}
              />
            </CustomTooltip>
            <CustomTooltip title="avalia????es">
              <AssessmentIcon
                className={clsx(classes.statsIcon, classes.handPointer)}
                color="action"
                onClick={() => clickActions('assessment')}
              />
            </CustomTooltip>
            <CustomTooltip title="editar">
              <EditIcon
                className={clsx(classes.statsIcon, classes.handPointer)}
                color="action"
                onClick={() => clickActions('edit')}
              />
            </CustomTooltip>
            <CustomTooltip title="excluir">
              <DeleteIcon
                className={clsx(classes.statsIcon, classes.handPointer)}
                color="action"
                onClick={() => clickActions('delete')}
              />
            </CustomTooltip>
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            />
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <CustomTooltip title="discentes matriculados">
              <PeopleIcon
                className={classes.statsIcon}
                color="action"
              />
            </CustomTooltip>
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {classroom.students}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  classroom: PropTypes.object.isRequired
};

export default Component;
