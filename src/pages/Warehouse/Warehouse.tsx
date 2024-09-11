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
import { useNavigate, useLocation } from 'react-router-dom';
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
    const newRow = { 
      id, 
      name: '', 
      age: '', 
      status: 'Pending', 
      avatar: '', 
      isNew: true, 
      joinDate: new Date() 
    };
    
    setRows((oldRows) => [...oldRows, newRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));

    // Open the modal for the new row
    setModalRow(newRow);
    setCurrentRowId(id);
    setOpenModal(true);
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
  const location = useLocation();

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
      setRows((prevRows) => 
        prevRows.map((row) => (row.id === modalRow.id ? modalRow : row))
      );
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
    {
      field: 'image',
      headerName: 'Image',
      width: 120,
      renderCell: (params) => (
        <Avatar alt={params.row.name} src={params.value} />
      ),
    },
    { field: 'warename', headerName: 'Warehouse Name', width: 180 },
    { field: 'mobile', headerName: 'Mobile Number', width: 180 },
    { field: 'email', headerName: 'Email', width: 180 },  // Fixed duplicate field name
    { field: 'warehouse', headerName: 'Ware House', width: 180 },
    { field: 'typep', headerName: 'Type', width: 180 },
    { field: 'address', headerName: 'Warehouse Address', width: 180 },

    {
      field: 'joinDate',
      headerName: 'Join date',
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
      renderCell: (params) => {
        return (
          <Box>
            <Button
              id="menu-button"
              aria-controls={anchorEl ? 'menu' : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? 'true' : undefined}
              onClick={(event) => handleMenuClick(event, params.id)}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'menu-button',
              }}
            >
              <MenuItem onClick={handleMenuAction('edit')}>Edit</MenuItem>
              <MenuItem onClick={handleMenuAction('delete')}>Delete</MenuItem>
              <MenuItem onClick={handleMenuAction('toggleStatus')}>
                Toggle Status
              </MenuItem>
            </Menu>
          </Box>
        );
      },
    },
  ];

  const handleModalChange = (field: string, value: any) => {
    setModalRow((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate('/')}
        >
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate(location.pathname)}
        >
          DataGrid Example
        </Link>
      </Breadcrumbs>

      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onRowModesModelChange={handleRowModesModelChange}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          {modalRow && (
            <>
              <TextField
                margin="dense"
                label="Driver Name"
                type="text"
                fullWidth
                variant="outlined"
                value={modalRow.name}
                onChange={(e) => handleModalChange('name', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Mobile Number"
                type="text"
                fullWidth
                variant="outlined"
                value={modalRow.mobile}
                onChange={(e) => handleModalChange('mobile', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Aadhar Image"
                type="text"
                fullWidth
                variant="outlined"
                value={modalRow.avatar}
                onChange={(e) => handleModalChange('avatar', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Aadhar Name"
                type="text"
                fullWidth
                variant="outlined"
                value={modalRow.warename}
                onChange={(e) => handleModalChange('warename', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Warehouse"
                type="text"
                fullWidth
                variant="outlined"
                value={modalRow.warehouse}
                onChange={(e) => handleModalChange('warehouse', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Type"
                type="text"
                fullWidth
                variant="outlined"
                value={modalRow.typep}
                onChange={(e) => handleModalChange('typep', e.target.value)}
              />
              <TextField
                margin="dense"
                label="Warehouse Address"
                type="text"
                fullWidth
                variant="outlined"
                value={modalRow.address}
                onChange={(e) => handleModalChange('address', e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSaveClick} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
