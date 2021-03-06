import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Typography
} from '@material-ui/core';
import TableToolbar from 'src/utils/TableToolbar';
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton
} from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import labels from '../../../utils/labels';

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
    '& .MuiDataGrid-colCellTitleContainer': {
      alignItems: 'center'
    }
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

const Component = ({
  className, enrollments, loading, ...rest
}) => {
  const classes = useStyles();
  const [translate] = useState(labels);
  // const [enrollment, setStudent] = useState(enrollments);
  // const [editedStudent, setEditedStudent] = useState({});
  const [page, setPage] = useState(
    localStorage.getItem('pagination_enrollment') ? parseFloat(localStorage.getItem('pagination_enrollment')) : 0
  );

  const handlePageChange = (event) => {
    setPage(event.page);
    localStorage.setItem('pagination_enrollment', event.page);
  };

  const columns = [
    {
      field: 'course',
      headerName: 'Curso',
      flex: 0.25,
      renderCell: (params) => {
        const { value } = params;
        return (
          <Typography variant="body1" component="p">
            {value}
          </Typography>
        );
      },
      renderHeader: () => {
        return (
          <Typography variant="h4" component="p">
            Curso
          </Typography>
        );
      },
    },
    {
      field: 'classroom',
      headerName: 'Turma',
      flex: 0.25,
      renderCell: (params) => {
        const { value } = params;
        return (
          <Typography variant="body1" component="p">
            {value}
          </Typography>
        );
      },
      renderHeader: () => {
        return (
          <Typography variant="h4" component="p">
            Turma
          </Typography>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.25,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const { value } = params;
        return (
          <Typography variant="body1" component="p">
            {value}
          </Typography>
        );
      },
      renderHeader: () => {
        return (
          <Typography variant="h4" component="p">
            Status
          </Typography>
        );
      },
    },
    {
      field: 'admission',
      headerName: 'Ingresso',
      flex: 0.25,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const { value } = params;
        return (
          <Typography variant="body1" component="p">
            {value}
          </Typography>
        );
      },
      renderHeader: () => {
        return (
          <Typography variant="h4" component="p">
            Ingresso
          </Typography>
        );
      },
    },
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box minWidth="md">
        <TableToolbar className title={<h4>Matr??culas</h4>} />
        <div style={{ display: 'flex', width: '100%' }}>
          <DataGrid
            className={classes.datagrid}
            columns={columns.map((column) => ({
              ...column,
              disableClickEventBubbling: true,
            }))}
            rows={enrollments}
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
            onPageChange={handlePageChange}
          />

        </div>
      </Box>
    </Card>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  enrollments: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  avatarURL: PropTypes.string
};

export default Component;
