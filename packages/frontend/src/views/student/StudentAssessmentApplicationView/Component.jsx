import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Grid,
  Typography,
} from '@material-ui/core';
import TableToolbar from 'src/utils/TableToolbar';
import { useNavigate } from 'react-router-dom';
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton
} from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import momenttz from 'moment-timezone';
import labels from '../../../utils/labels';
import CustomTooltip from '../../../utils/CustomTooltip';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    cursor: 'pointer',
  },
  actions: {
    paddingTop: theme.spacing(2)
  },
  datagrid: {
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#fafafa',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
      borderRight: `1px solid ${'#f0f0f0'}`,
    },
  },
}));

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridColumnsToolbarButton />
      <GridFilterToolbarButton />
    </GridToolbarContainer>
  );
};

const Results = ({
  className, assessments, loading, ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [translate] = useState(labels);
  const [page, setPage] = useState(
    localStorage.getItem('pagination_assessment_s') ? parseFloat(localStorage.getItem('pagination_assessment_s')) : 0
  );

  const handlePageChange = (event) => {
    setPage(event.page);
    localStorage.setItem('pagination_assessment_s', event.page);
  };

  // const handleCellClick = (param, event) => {
  //   console.log('cell clicked:', param.value);
  //   console.log('object: ', param.row);
  //   if (param.colIndex === 2) {
  //     event.stopPropagation();
  //   }
  // };

  const clickActions = (action) => {
    switch (action) {
      case 'view':
        navigate('/app/student-assessment-application', { replace: false });
        break;
      default:
        break;
    }
  };

  // const [w, setW] = useState(false);
  // const handleSortModelChange = (event) => {
  //   console.log(event);
  //   console.log(event.columns[0].width);
  //   console.log(event.columns[1].width);
  //   console.log(event.columns[2].width);
  //   setW(true);
  // };
  // ------------
  const columns = [
    {
      field: 'description',
      headerName: 'Descri????o da avalia????o',
      flex: 1,
      renderHeader: () => (
        <Typography variant="h4" component="p">
          Descri????o da avalia????o
        </Typography>
      ),
      renderCell: (params) => {
        const { value } = params;
        return (
          <Typography variant="body1" component="p">
            {value}
          </Typography>
        );
      }
    },
    {
      field: 'endDate',
      headerName: 'Prazo final',
      // flex: w ? 1 : null,
      // width: w ? null : 180,
      width: 200,
      headerAlign: 'right',
      description: <Typography variant="body1">Prazo final para fazer a avalia????o</Typography>,
      renderHeader: () => (
        <Typography variant="h4" component="p">
          Prazo final
        </Typography>
      ),
      align: 'center',
      renderCell: (params) => {
        const { value } = params;
        return (
          <Typography variant="body1" component="p">
            {momenttz(value).tz('America/Bahia').format('DD/MM/yyyy')}
          </Typography>
        );
      },
    },
    {
      field: 'acoes',
      flex: 1,
      headerName: 'A????es',
      sortable: false,
      filterable: false,
      disableColumnSelector: true,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <Typography variant="h4" component="p">
          A????o
        </Typography>
      ),
      renderCell: () => (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.actions}
          spacing={1}
        >
          <Grid item>
            <CustomTooltip title="responder avalia????o">
              <EditIcon className={classes.button} onClick={() => { clickActions('view'); }} />
            </CustomTooltip>
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box minWidth="md">
        <TableToolbar title={<h4>Avalia????es</h4>} />
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={assessments}
            columns={columns.map((column) => ({
              ...column
            }))}
            pageSize={9}
            page={page}
            autoHeight
            components={{
              Toolbar: CustomToolbar,
            }}
            pagination
            localeText={translate}
            loading={loading}
            className={classes.datagrid}
            onPageChange={handlePageChange}
            disableSelectionOnClick
            onRowClick={(rowData) => {
              localStorage.setItem('selected_application', JSON.stringify(rowData.row, null, 2));
            }}
          />
        </div>
      </Box>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  assessments: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  avatarURL: PropTypes.string
};

export default Results;
