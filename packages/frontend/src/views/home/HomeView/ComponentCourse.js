import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import Toolbar from './Toolbar';
import Component from './Component';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  card: {
    height: '100%'
  },
  pagination: {
    bottom: '0px',
    zIndex: '0'
  },
}));

const ComponentCourse = ({
  className, courses, courseCategory, ...rest
}) => {
  const classes = useStyles();
  const [limit] = useState(3);
  const [page, setPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState();
  const [totalPages, setTotalPages] = useState();
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(courses.filter((res) => res.category === courseCategory));
  }, []);

  useEffect(() => {
    setTotalCourses(results.length);
  }, [results]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalCourses / 3));
  }, [totalCourses]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // const CircularProgressWithLabel = (v) => {
  //   return (
  //     <Box position="relative" display="inline-flex">
  //       <CircularProgress variant="determinate" />
  //       <Box
  //         top={0}
  //         left={0}
  //         bottom={0}
  //         right={0}
  //         position="absolute"
  //         display="flex"
  //         alignItems="center"
  //         justifyContent="center"
  //       >
  //         <Typography variant="caption" component="div" color="textSecondary">
  //           {`${Math.round(
  //             v,
  //           )}%`}
  //         </Typography>
  //       </Box>
  //     </Box>
  //   );
  // };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar title={courseCategory} />
      <Box mt={3}>
        <Grid
          container
          spacing={3}
        >
          { results.slice((page - 1) * limit, (page - 1) * limit + limit).map((result) => (
            <Grid
              item
              key={uuid()}
              lg={4}
              md={6}
              xs={12}
            >
              <Component
                className={classes.card}
                key={uuid()}
                course={result}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        mt={3}
        display="flex"
        justifyContent="center"
      >
        { totalCourses > 0
          ? (
            <Pagination
              className={classes.pagination}
              color="primary"
              size="small"
              count={totalPages}
              onChange={handlePageChange}
              defaultPage={1}
              page={page}
              siblingCount={0}
            />
          )
          : <div><Typography color="textPrimary" variant="subtitle1">em breve</Typography></div>}
      </Box>
    </div>
  );
};

ComponentCourse.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.any,
  value: PropTypes.number.isRequired,
  courseCategory: PropTypes.string
};

export default ComponentCourse;
