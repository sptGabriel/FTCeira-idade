import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  Fade,
  Menu
} from '@material-ui/core';
import customTooltips from './tool';

const useStyles = makeStyles((theme) => ({
  root: {},
  teste: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  sobre: {
    flex: 1,
    position: 'absolute',
    zIndex: 10,
  },
  filter: {
    visibility: 'hidden'
  }
}));

const LearningPerformance = ({
  className, title, dataset, filter, ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = {
    cornerRadius: 0,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    maxBarThickness: 10,
    barPercentage: 0.5,
    categoryPercentage: 0.5,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
      callbacks: {
        custom: customTooltips,
        callbacks: {
          label: (tooltipItem, data) => {
            const index = tooltipItem.datasetIndex === undefined ? tooltipItem.index : tooltipItem.datasetIndex;
            const itemData = data.datasets[index];
            // Return custom data to tooltip, these will be available inside the tooltip.body
            return {
              id: data.id,
              pictureUrl: itemData.pictureUrl,
              label: itemData.label,
              value: tooltipItem.yLabel,
              xLabel: tooltipItem.xLabel,
              percent: data.percent
            };
          }

        }
        // label: (tooltipItem) => {
        //   return tooltipItem.value;
        // }
      }
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} className={!filter ? classes.filter : null}>
            filtro
          </Button>
        )}
        title={title}
      />

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      />

      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={dataset}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      />
    </Card>
  );
};

LearningPerformance.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  dataset: PropTypes.any.isRequired,
  filter: PropTypes.bool
};

export default LearningPerformance;
