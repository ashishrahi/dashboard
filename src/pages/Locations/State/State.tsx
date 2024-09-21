import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Button, Chip, Snackbar, Alert, Tooltip } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import AddStateModal from './addState';
import UpdateStateModal from './updateState';
import { useStates,useStatusMutationState } from '../../../services/Api/location/mutationState';
import { CancelIcon, CheckCircleIcon } from '../../../components/icons/Icons';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { data, refetch } = useStates();
  const { mutateAsync: statusMutation } = useStatusMutationState();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (data) {
      const updatedRows = data.map((item, index) => ({
        ...item,
        countryname: item.countryname.charAt(0).toUpperCase() + item.countryname.slice(1).toLowerCase(),
        statename: item.statename.charAt(0).toUpperCase() + item.statename.slice(1).toLowerCase(),
        serialNumber: index + 1,
      }));
      setRows(updatedRows);
    }
  }, [data]);

  const handleEdit = (id) => {
    const stateToEdit = rows.find(row => row._id === id);
    setSelectedState(stateToEdit);
    setUpdateModalOpen(true);
  };

  const handleStatusToggle = async (id) => {
    try {
      const row = rows.find((row) => row._id === id);
      const updatedStatus = !row.status;
      await statusMutation(id); // Ensure the mutation is awaited
      setRows((prevRows) =>
        prevRows.map((row) =>
          row._id === id ? { ...row, status: updatedStatus } : row
        )
      );
      setSnackbarMessage(`State status updated to ${updatedStatus ? 'Active' : 'Inactive'}`);
      setSnackbarOpen(true); // Show snackbar on success
    } catch (error) {
      console.error('Error updating status', error);
      setSnackbarMessage('Error updating State status');
      setSnackbarOpen(true); // Show snackbar on error
    }
  };

  const handleAddState = (newState) => {
    setRows((prevRows) => [...prevRows, newState]);
    refetch();
  };

  const handleUpdateState = (updatedState) => {
    setRows((prevRows) =>
      prevRows.map(row => (row._id === updatedState._id ? updatedState : row))
    );
    setUpdateModalOpen(false);
    refetch();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const importedRows = results.data.map((item, index) => ({
          ...item,
          serialNumber: index + 1,
        }));
        setRows(importedRows);
        setSnackbarMessage('States imported successfully!');
        setSnackbarOpen(true);
      },
    });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const columns = useMemo(() => [
    { field: 'serialNumber', headerName: 'S/no.', width: 180 },
    
    { field: 'createAt', headerName: 'CreatedAt.', width: 180 },
    { field: 'countryname', headerName: 'Country', width: 180 },
    { field: 'statename', headerName: 'State', width: 180 },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      renderCell: (params) => (
        <div className={`cellWithStatus ${params.row.status}`}>
          <Chip
            value={params.value}
            icon={params.row.status ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
            label={params.row.status ? "Active" : "Inactive"}
            variant="outlined"
            style={{ cursor: 'pointer' }} // Change cursor for better UX
          />
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        <ActionsMenu
          id={params.id}
          currentStatus={params.row.status}
          onEdit={handleEdit} // Pass edit function
          onToggleStatus={handleStatusToggle} // Pass toggle function
        />
      ),
    },
  ], [handleEdit, handleStatusToggle]); // Add dependencies

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Button onClick={() => setAddModalOpen(true)} variant="outlined" color="primary">
          Add State
        </Button>
        <Tooltip title='Import & Export Data'>

        <IconButton
          onClick={handleMenuClick}
          style={{ width: '48px', height: '48px' }} // Set fixed size
        >
          <MoreVertIcon />
        </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem>
              <input type="file" accept=".csv" onChange={handleImportCSV} style={{ display: 'none' }} id="csv-upload" />
              <label htmlFor="csv-upload" style={{ cursor: 'pointer' }}>Import from CSV</label>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <CSVLink data={rows} filename={"states.csv"}>
                Export to CSV
              </CSVLink>
            </MenuItem>
          </Menu>
        </Tooltip>
      </div>

      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={{ page: 0, pageSize: 25 }}
          style={{ maxHeight: '100%', width: '100%' }}
          pageSizeOptions={[25, 100]}
          sx={{
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
          }}
        />
      </Paper>

      <AddStateModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddState} />
      <UpdateStateModal open={updateModalOpen} onClose={() => setUpdateModalOpen(false)} state={selectedState} id={selectedState?._id} onUpdate={handleUpdateState} />

      {/* Snackbar for status update */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Set position to bottom-right
        onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%', marginTop: '24%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

const ActionsMenu = ({ id, currentStatus, onEdit, onToggleStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { onEdit(id); handleClose(); }}>Edit</MenuItem>
        <MenuItem onClick={() => { onToggleStatus(id); handleClose(); }}>
          {currentStatus ? 'Deactivate' : 'Activate'}
        </MenuItem>
      </Menu>
    </>
  );
};

export default DataTable;
