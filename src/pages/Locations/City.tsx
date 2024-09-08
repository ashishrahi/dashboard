import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate, useLocation } from 'react-router-dom'; // Updated import
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import ActiveIcon from '@mui/icons-material/CheckCircle';
import InactiveIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/HourglassEmpty';

const roles = ['Market', 'Finance', 'Development'];
const statuses = ['Active', 'Inactive', 'Pending'];
const randomRole = () => randomArrayItem(roles);
const randomStatus = () => randomArrayItem(statuses);

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    status: randomStatus(),
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    status: randomStatus(),
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  // Add more rows as needed
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleAddClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', age: '', status: 'Pending', avatar: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentRowId, setCurrentRowId] = React.useState<GridRowId | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalRow, setModalRow] = React.useState<GridRowModel | null>(null);

  const navigate = useNavigate();
  const location = useLocation(); // Hook for location

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    const row = rows.find((row) => row.id === id);
    setModalRow(row ?? null);
    setOpenModal(true);
    setCurrentRowId(id);
  };

  const handleSaveClick = () => {
    if (modalRow) {
      setRows(rows.map((row) => (row.id === modalRow.id ? modalRow : row)));
    }
    setOpenModal(false);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: GridRowId) => {
    setAnchorEl(event.currentTarget);
    setCurrentRowId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action: 'edit' | 'delete' | 'toggleStatus') => () => {
    if (currentRowId === null) return;
    handleCloseMenu();
    if (action === 'edit') {
      handleEditClick(currentRowId)();
    } else if (action === 'delete') {
      handleDeleteClick(currentRowId)();
    } else if (action === 'toggleStatus') {
      const row = rows.find((row) => row.id === currentRowId);
      if (row) {
        const newStatus = row.status === 'Active' ? 'Inactive' : 'Active';
        handleModalChange('status', newStatus);
        setRows(rows.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r)));
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Inactive':
        return 'red';
      case 'Pending':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <ActiveIcon sx={{ color: 'green' }} />;
      case 'Inactive':
        return <InactiveIcon sx={{ color: 'red' }} />;
      case 'Pending':
        return <PendingIcon sx={{ color: 'orange' }} />;
      default:
        return null;
    }
  };

  const columns: GridColDef[] = [
    
  { field: 'srno', headerName: 'Srno', width: 180 },
  { field: 'country', headerName: 'Country', width: 180 },
  { field: 'state', headerName: 'State', width: 180 },
  { field: 'City', headerName: 'City', width: 180 },

   
    {
      field: 'joinDate',
      headerName: 'Created date',
      type: 'date',
      width: 180,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: getStatusColor(params.value),
          }}
        >
          {getStatusIcon(params.value)}
          <span style={{ marginLeft: 8 }}>{params.value}</span>
        </Box>
      ),
      type: 'singleSelect',
      valueOptions: statuses,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 180,
      cellClassName: 'actions',
      renderCell: (params) => (
        <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(event) => handleMenuClick(event, params.id)}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleMenuAction('edit')}>Edit</MenuItem>
            <MenuItem onClick={handleMenuAction('delete')}>Delete</MenuItem>
            <MenuItem onClick={handleMenuAction('toggleStatus')}>Toggle Status</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const handleModalChange = (field: string, value: any) => {
    if (modalRow) {
      setModalRow({ ...modalRow, [field]: value });
    }
  };

  // Function to generate breadcrumb links based on location
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    return [
      { to: '/', label: 'Home' }, // Add "Home" link
      ...pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        return {
          to,
          label: value.charAt(0).toUpperCase() + value.slice(1),
        };
      }),
    ].map(({ to, label }) => (
      <Link key={to} color="inherit" onClick={() => navigate(to)} sx={{textDecoration:'none'}}>
        {label}
      </Link>
    ));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ marginBottom: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          {generateBreadcrumbs()}
        </Breadcrumbs>
      </Box>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onRowModesModelChange={handleRowModesModelChange}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </div>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={modalRow?.name ?? ''}
            onChange={(e) => handleModalChange('name', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            value={modalRow?.age ?? ''}
            onChange={(e) => handleModalChange('age', Number(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Join Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={modalRow?.joinDate.toISOString().substring(0, 10) ?? ''}
            onChange={(e) => handleModalChange('joinDate', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Role"
            select
            fullWidth
            value={modalRow?.role ?? ''}
            onChange={(e) => handleModalChange('role', e.target.value)}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Status"
            select
            fullWidth
            value={modalRow?.status ?? ''}
            onChange={(e) => handleModalChange('status', e.target.value)}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
