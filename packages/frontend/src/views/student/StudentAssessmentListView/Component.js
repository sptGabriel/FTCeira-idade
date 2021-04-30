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
  DataGrid, GridToolbarContainer, GridColumnsToolbarButton, GridFilterToolbarButton
} from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
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

  const handleCellClick = (param, event) => {
    console.log('Cell:');
    console.log(param);
    console.log(param.value);
    console.log(param.row);
    console.log(event);
    if (param.colIndex === 2) {
      event.stopPropagation();
    }
  };

  const handleRowClick = (param, event) => {
    console.log('Row:');
    console.log(param);
    console.log(param.value);
    console.log(event);
  };

  const clickActions = (action) => {
    switch (action) {
      case 'view':
        navigate('/app/student-assessment-view', { replace: false });
        break;
      default:
        break;
    }
  };
  // ------------
  const columns = [
    {
      field: 'description',
      width: 1024,
      // flex: 1,
      renderHeader: () => (
        <Typography variant="h4" component="p">
          Descrição
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
      field: 'end_date',
      width: 300,
      headerAlign: 'center',
      description: <Typography variant="body2">Prazo final para fazer a avaliação</Typography>,
      renderHeader: () => (
        <Typography variant="h4" component="p">
          Prazo final
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
      field: 'acoes',
      width: 110,
      sortable: false,
      filterable: false,
      disableColumnSelector: true,
      headerAlign: 'center',
      renderHeader: () => (
        <Typography variant="h4" component="p">
          Ação
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
            <CustomTooltip title="visualizar detalhes dessa avaliação">
              <VisibilityIcon className={classes.button} onClick={() => { clickActions('view'); }} />
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
        <TableToolbar
          title={
            <h3>Avaliações</h3>
         }
        />
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={assessments}
            columns={columns.map((column) => ({
              ...column,
              disableClickEventBubbling: true,
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
            density="comfortable"
            onCellClick={handleCellClick}
            onRowClick={handleRowClick}
            className={classes.datagrid}
            onPageChange={handlePageChange}
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
