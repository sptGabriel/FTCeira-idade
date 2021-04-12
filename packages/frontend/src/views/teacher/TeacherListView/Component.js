import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Grid,
} from '@material-ui/core';
import TableToolbar from 'src/utils/TableToolbar';
import { useNavigate } from 'react-router-dom';
import {
  DataGrid, GridToolbarContainer, GridColumnsToolbarButton, GridFilterToolbarButton
} from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import labels from './labels';

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
  className, teachers, loading, ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [translate] = useState(labels);

  const clickActions = (action) => {
    switch (action) {
      case 'view':
        navigate('/app/teacher-view', { replace: false });
        break;
      case 'edit':
        navigate('/app/teacher-edit', { replace: false });
        break;
      case 'delete':
        navigate('/app/teacher-delete', { replace: false });
        break;
      default:
        break;
    }
  };
  //------------

  const columns = [
    {
      field: 'avatarURL',
      headerName: 'Avatar',
      width: 100,
      description: 'Essa coluna não pode ser ordenada',
      sortable: false,
      filterable: false,
      renderCell: ({ avatarURL }) => (
        <Avatar alt="" src={(avatarURL)} />
      ),
    },
    { field: 'name', headerName: 'Nome', width: 450 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Telefone', width: 150 },
    {
      field: '_',
      headerName: 'Endereço',
      width: 400,
      valueGetter: (params) => `${params.row.street || ''}, ${params.row.city || ''}`,
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 150,
      description: 'Essa coluna não pode ser ordenada',
      sortable: false,
      filterable: false,
      disableColumnSelector: true,
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
            <VisibilityIcon className={classes.button} onClick={() => { clickActions('view'); }} />
          </Grid>
          <Grid item>
            <EditIcon className={classes.button} onClick={() => { clickActions('edit'); }} />
          </Grid>
          <Grid item>
            <DeleteIcon className={classes.button} onClick={() => { clickActions('delete'); }} />
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
        <TableToolbar className title="Docentes" />
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={teachers}
            columns={columns.map((column) => ({
              ...column,
              disableClickEventBubbling: true,
            }))}
            pageSize={10}
            autoHeight
            checkboxSelection
            components={{
              Toolbar: CustomToolbar,
            }}
            pagination
            localeText={translate}
            loading={loading}
          />
        </div>
      </Box>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  teachers: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  avatarURL: PropTypes.string
};

export default Results;
