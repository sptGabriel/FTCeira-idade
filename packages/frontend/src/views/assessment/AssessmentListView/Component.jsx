import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Grid
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
import ViewIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import labels from '../../../utils/labels';
import CustomTooltip from '../../../utils/CustomTooltip';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  button: {
    cursor: 'pointer',
  },
  actions: {
    paddingTop: theme.spacing(2)
  },
  '@global': {
    'div.MuiDataGridColumnsPanel-container > :first-of-type': {
      visibility: 'hidden !important',
      position: 'absolute'
    }
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
  }
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
  className, assessments, title, loading, ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [translate] = useState(labels);
  const [page, setPage] = useState(
    localStorage.getItem('pagination_assessment') ? parseFloat(localStorage.getItem('pagination_assessment')) : 0
  );

  const handlePageChange = (event) => {
    setPage(event.page);
    localStorage.setItem('pagination_assessment', event.page);
  };

  const clickActions = (action) => {
    switch (action) {
      case 'view':
        navigate('/app/assessment', { replace: false });
        break;
      case 'delete':
        navigate('/app/assessment-delete', { replace: false });
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      field: 'description',
      headerName: 'Descri????o',
      // width: 750,
      flex: 1
    },
    {
      field: 'startDate',
      headerName: 'Data inicial',
      headerAlign: 'center',
      align: 'center',
      width: 150
    },
    {
      field: 'endDate',
      headerName: 'Data final',
      headerAlign: 'center',
      align: 'center',
      width: 150
    },
    {
      field: 'acoes',
      headerName: 'A????es',
      width: 150,
      description: 'Essa coluna n??o pode ser ordenada',
      sortable: false,
      filterable: false,
      disableColumnSelector: true,
      headerAlign: 'center',
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
            <CustomTooltip title="visualizar">
              <ViewIcon
                className={classes.button}
                onClick={() => { clickActions('view'); }}
              />
            </CustomTooltip>
          </Grid>
          <Grid item>
            <CustomTooltip title="excluir">
              <DeleteIcon className={classes.button} onClick={() => { clickActions('delete'); }} />
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
        <TableToolbar className title={title} />
        <div style={{ width: '100%' }}>
          <DataGrid
            className={classes.datagrid}
            rows={assessments}
            columns={columns.map((column) => ({
              ...column,
              //  disableClickEventBubbling: true,
            }))}
            pageSize={10}
            page={page}
            autoHeight
            checkboxSelection
            components={{
              Toolbar: CustomToolbar,
            }}
            pagination
            localeText={translate}
            loading={loading}
            onPageChange={handlePageChange}
            disableSelectionOnClick
            onRowClick={(rowData) => {
              localStorage.setItem('selected_assessment', JSON.stringify(rowData.row, null, 2));
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
  title: PropTypes.string,
  avatarURL: PropTypes.string
};

export default Results;
