import React, { useCallback, useState } from 'react';
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
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton
} from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BarChartIcon from '@material-ui/icons/BarChart';
import CustomDialog from 'src/components/CustomDialog';
import labels from '../../../utils/labels';
import CustomTooltip from '../../../utils/CustomTooltip';
// import CustomSnackbar from '../../../components/CustomSnackbar';

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

const Component = ({
  className, students, loading, ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [translate] = useState(labels);
  // const [student, setStudent] = useState(students);
  // const [editedStudent, setEditedStudent] = useState({});
  const [page, setPage] = useState(
    localStorage.getItem('pagination_student') ? parseFloat(localStorage.getItem('pagination_student')) : 0
  );
  // const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleOpenSnack = (text) => {
  //   setMessage(text);
  //   setOpen(true);
  // };
  // const handleCloseSnack = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     setOpen(false);
  //     return;
  //   }
  //   setOpen(false);
  // };

  const handleOpenDialog = useCallback((status) => {
    setOpenDialog(status);
  });

  const handleAction = useCallback(() => {
    setOpenDialog(false);
    console.log('confirmado');
    // handleOpenSnack('registro excluído com sucesso');
  });

  const handlePageChange = (event) => {
    setPage(event.page);
    localStorage.setItem('pagination_student', event.page);
  };

  // const validateEmail = (email) => {
  //   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(email).toLowerCase());
  // };

  // const handleEditCellChange = useCallback(
  //   ({ id, field, props }) => {
  //     if (field === 'email') {
  //       const data = props; // Fix eslint value is missing in prop-types for JS files
  //       const isValid = validateEmail(data.value);
  //       const newState = {};
  //       newState[id] = {
  //         ...editedStudent[id],
  //         email: { ...props, error: !isValid },
  //       };

  //       setEditedStudent((state) => ({ ...state, ...newState }));
  //     }
  //   },
  //   [editedStudent],
  // );

  // const handleEditCellChange = useCallback(
  // (params) => {
  //   setEditedStudent(params.model);
  //   const { field } = params;
  //   const { value } = params.props;

  //   if (field === 'email') {
  //     if (validateEmail(value) === true) {
  //       setStudent({ ...student, [field]: value });
  //       console.log('success');
  //     } else {
  //       console.log('error');
  //     }
  //   } else {
  //     setStudent({ ...student, [field]: value });
  //     console.log('success');
  //     return (
  //       <SnackBar
  //         enableButton
  //         primary
  //       />
  //     );
  //   }
  // },
  //  [],
  // );

  const clickActions = (action) => {
    switch (action) {
      case 'chart':
        navigate('/app/student-performance', { replace: false });
        break;
      case 'edit':
        navigate('/app/student-edit', { replace: false });
        break;
      case 'delete':
        // navigate('/app/student-delete', { replace: false });
        handleOpenDialog(true);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      field: 'avatarURL',
      headerName: 'Avatar',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: ({ avatarURL }) => (
        <Avatar alt="" src={(avatarURL)} />
      ),
    },
    {
      field: '_',
      headerName: 'Nome',
      flex: 1,
      valueGetter: (params) => `${params.row.firstname || ''} ${params.row.lastname || ''}`,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 150
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      editable: true
    },
    {
      field: 'birth',
      headerName: 'Aniversário',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    // {
    //   field: '_',
    //   headerName: 'Endereço',
    //   width: 465,
    //   //  `${params.getValue('street')}`,
    //   valueGetter: (params) => `${params.row.street || ''}, ${params.row.city || ''}`,
    // },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 155,
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
            <CustomTooltip title="desempenho">
              <BarChartIcon className={classes.button} onClick={() => { clickActions('chart'); }} />
            </CustomTooltip>
          </Grid>
          <Grid item>
            <CustomTooltip title="editar">
              <EditIcon className={classes.button} onClick={() => { clickActions('edit'); }} />
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
      {/* <CustomSnackbar
        message={message}
        openStatus={open}
        handleClose={handleCloseSnack}
        timeClose={6000}
        severity="success"
      /> */}
      <Box minWidth="md">
        <TableToolbar className title="Discentes" />
        <div style={{ display: 'flex', width: '100%' }}>
          <DataGrid
            className={classes.datagrid}
            rows={students}
            columns={columns.map((column) => ({
              ...column,
              disableClickEventBubbling: true,
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
          />

        </div>
      </Box>
      <CustomDialog
        openStatus={openDialog}
        handleClose={() => handleOpenDialog(false)}
        handleAction={() => handleAction()}
      />
    </Card>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  students: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  avatarURL: PropTypes.string
};

export default Component;
