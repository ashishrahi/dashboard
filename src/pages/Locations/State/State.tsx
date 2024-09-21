import * as React from 'react';
import { useLocation, Link as RouterLink,Link } from 'react-router-dom';
import {Button} from '../../../components/Input/Input';
import {AddIcon,CancelIcon,CheckCircleIcon,MoreVertIcon,VisibilityIcon,EditIcon} from '../../../components/icons/Icons';
import Alert from '@mui/material/Alert';
import {CircularProgress,Snackbar} from '../../../components/feedBack/feedBack';
import {Chip} from '../../../components/dataDisplay/dataDisplay';
import { Avatar, Breadcrumbs, Link as MuiLink, Container, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import AddCountryModal from './addState'
import UpdateCountryModal from './updateState';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModesModel
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { useCountry, useStatusMutationCountry } from '../../../services/fetchApi/locationApi/mutationCountry';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => randomArrayItem(roles);

interface Row {
  id: string;
  name: string;
  age: number;
  joinDate: Date;
  role: string;
  isNew?: boolean;
  _id?: string;
  status?: boolean;
  image?: string;
  categoryname?: string;

}



interface EditToolbarProps {
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen} label='Add State'>
        </Button>
        <AddCountryModal open={open} onClose={handleClose}/>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const {  data = [], isLoading } = useCountriesQuery({ refetchInterval: 5000 });
  const location = useLocation();
  const [rows, setRows] = React.useState<Row[]>(data || []);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [initialLoading, setInitialLoading] = React.useState<boolean>(true);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentRowId, setCurrentRowId] = React.useState<string | null>(null);
  const { mutateAsync: statusMutation } = useUpdateCountryStatus();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  React.useEffect(() => {
    if (data) {
      setRows(data);
    }

    setTimeout(() => {
      setInitialLoading(false);
    }, 500);
  }, [data]);

  const handleRowEditStop = (params: { reason: GridRowEditStopReasons }, event: React.SyntheticEvent) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: string) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: string) => async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setSnackbar({ open: true, message: 'Row saved successfully', severity: 'success' });
  };

  const handleDeleteClick = (id: string) => async () => {
    setLoading(true);
    setRows(rows.filter((row) => row.id !== id));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);

    setSnackbar({ open: true, message: 'Row deleted successfully', severity: 'error' });
  };

  const handleCancelClick = (id: string) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: Row) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleStatusToggle = async (id: string) => {
    try {
      const row = rows.find((row) => row._id === id);
      if (row) {
        const updatedStatus = !row.status;
        await statusMutation(id);
        setRows((prevRows) =>
          prevRows.map((row) =>
            row._id === id ? { ...row, status: updatedStatus } : row
          )
        );
      }
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchorEl(event.currentTarget);
    setCurrentRowId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setCurrentRowId(null);
  };

  const handleViewClick = () => {
    handleMenuClose();
    if (currentRowId) {
      // Navigate to view page or perform the view action
    }
  };

  const handleEditClickMenu = () => {
    handleMenuClose();
    if (currentRowId) {
      // Handle edit action
      setRowModesModel({ ...rowModesModel, [currentRowId]: { mode: GridRowModes.Edit } });
    }
  };

  const handleDeleteClickMenu = () => {
    handleMenuClose();
    if (currentRowId) {
      handleDeleteClick(currentRowId)();
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const columns = [
    // {
    //   field: 'image',
    //   headerName: 'Image',
    //   width: 280,
    //   renderCell: (params: { value: string; row: Row }) => (
    //     <Avatar src={params.value} alt={params.row.name} />
    //   ),
    // },
    {
      field: 'countryname',
      headerName: 'Country Name',
      width: 280,
      renderCell: (params: { row: Row }) => (
        <div>{capitalizeFirstLetter(params.row.countryname || '')}</div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 280,
      renderCell: (params: { row: Row }) => {
        return (
          <div className={`cellWithStatus ${params.row.status ? 'active' : 'inactive'}`}>
            {params.row.status ? (
              <Chip
                value={params.row.status}
                icon={<CheckCircleIcon style={{ color: 'green' }} />}
                label="Active"
                variant="outlined"
                onClick={() => handleStatusToggle(params.row._id!)}
              />
            ) : (
              <Chip
                value={params.row.status}
                icon={<CancelIcon style={{ color: 'red' }} />}
                label="Inactive"
                variant="outlined"
                onClick={() => handleStatusToggle(params.row._id!)}
              />
            )}
          </div>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      renderCell: (params: { id: string }) => (
        <>
          <IconButton onClick={(event) => handleMenuOpen(event, params.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl) && currentRowId === params.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleViewClick}><Tooltip title='View'><VisibilityIcon/></Tooltip></MenuItem>
            <MenuItem onClick={handleOpen}><Tooltip title='Edit'><EditIcon/></Tooltip></MenuItem>
          <UpdateCountryModal open={open} onClose={handleClose} id = {currentRowId} />
          </Menu>
        </>
      ),
    },
  ];

  const getRowHeight = () => {
    return 70; // Adjust the height based on your needs
  };

  const renderBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          marginBottom: '20px',
        }}
      >
        <MuiLink color="inherit" component={RouterLink} to="/" sx={{textDecoration:'none'}}>
          Home
        </MuiLink>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return last ? (
            <MuiLink color="textPrimary" sx={{textDecoration:'none'}}>
              {capitalizeFirstLetter(value)}
            </MuiLink>
          ) : (
            <MuiLink color="inherit" component={RouterLink} to={to} key={to} sx={{textDecoration:'none'}}>
              {capitalizeFirstLetter(value)}
            </MuiLink>
          );
        })}
      </Breadcrumbs>
    );
  };

  return (
    <Container
      sx={{
        height: 500,
        marginLeft: '20px',
        marginRight: '40px',
        marginTop: '20px',
        width: '97%',
        position: 'relative',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      {renderBreadcrumbs()}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {loading && (
            <Container
              sx={{
                position: 'absolute',
                marginRight: '10px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Container>
          )}
          <DataGrid
            rows={rows}
            columns={columns}
            getRowHeight={getRowHeight}
            editMode="row"
            getRowId={(row) => row._id!}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f0f0f0', // Light grey color for header
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-columnHeader': {
                color: '#000', // Text color for header
              },
            }}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            pagination
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            rowsPerPageOptions={[5, 10, 20]}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
