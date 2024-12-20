import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Button, Chip, Snackbar, Alert, Tooltip, Avatar } from '@mui/material';
import { useState, useEffect, useMemo, useCallback } from 'react';
import AddCategoryModal from './addCategory'; // Adjust import if necessary
import UpdateCategoryModal from './updateCategory'; // Adjust import if necessary
import { useCategory, useStatusMutationCategory } from '../../../services/Api/categoryApi/mutationCategory'; // Adjust import if necessary
import { CancelIcon, CheckCircleIcon } from '../../../components/icons/Icons';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import AddIcon from '@mui/icons-material/Add';
import { debounce } from 'lodash';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EditIcon from '@mui/icons-material/Edit';

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { data, refetch } = useCategory();
  const { mutateAsync: statusMutation } = useStatusMutationCategory();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (data) {
      const updatedRows = data.map((item, index) => ({
        _id: item._id,
        serialNumber: index + 1,
        categoryname: item.categoryname,
        categorydescription: item.categorydescription,
        createdAt: item.createdAt,
        status: item.status,
        image: item.image, // Adding image field
      }));
      setRows(updatedRows);
    }
  }, [data]);

  const handleEdit = (id) => {
    const categoryToEdit = rows.find(row => row._id === id);
    setSelectedCategory(categoryToEdit);
    setUpdateModalOpen(true);
  };

  const debouncedStatusToggle = useCallback(
    debounce(async (id) => {
      try {
        const row = rows.find((row) => row._id === id);
        const updatedStatus = !row.status;
        await statusMutation(id);
        setRows((prevRows) =>
          prevRows.map((row) =>
            row._id === id ? { ...row, status: updatedStatus } : row
          )
        );
        setSnackbarMessage(`Category status updated to ${updatedStatus ? 'Active' : 'Inactive'}`);
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error updating status', error);
        setSnackbarMessage('Error updating category status');
        setSnackbarOpen(true);
      }
    }, 300),
    [rows, statusMutation]
  );

  const handleStatusToggle = (id) => {
    debouncedStatusToggle(id);
  };

  const handleAddCategory = (newCategory) => {
    setRows((prevRows) => [...prevRows, newCategory]);
    refetch();
  };

  const handleUpdateCategory = (updatedCategory) => {
    setRows((prevRows) =>
      prevRows.map(row => (row._id === updatedCategory._id ? updatedCategory : row))
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
          _id: item._id || `imported_${index}`,
          serialNumber: index + 1,
          categoryname: item.categoryname,
          categorydescription: item.categorydescription,
          createdAt: item.createdAt,
          status: item.status === 'Active',
          image: item.image, // Include image from imported data
        }));
        setRows(importedRows);
        setSnackbarMessage('Categories imported successfully!');
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
    { field: 'serialNumber', headerName: 'S/no.', width: 100 },
    { field: 'createdAt', headerName: 'Created At', width: 180 },
    
    {
      field: 'image',
      headerName: 'Category Image',
      width: 180,
      renderCell: (params) => (
        <Avatar src={params.row.image} alt={params.row.categoryname} />
      ),
    },
    { field: 'categoryname', headerName: 'Category Name', width: 200 },
    { field: 'categorydescription', headerName: 'Description', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <div className={`cellWithStatus ${params.row.status}`}>
          <Chip
            value={params.value}
            icon={params.row.status ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
            label={params.row.status ? "Active" : "Inactive"}
            variant="outlined"
            style={{ cursor: 'pointer' }}
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
          onEdit={handleEdit}
          onToggleStatus={handleStatusToggle}
        />
      ),
    },
  ], [handleEdit, handleStatusToggle]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Button onClick={() => setAddModalOpen(true)} variant="text" color="primary">
          <AddIcon />Category
        </Button>
        <Tooltip title='Import & Export Data'>
          <IconButton onClick={handleMenuClick} style={{ width: '48px', height: '48px' }}>
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
              <CSVLink data={rows} filename={"categories.csv"}>
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

      <AddCategoryModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddCategory} />
      <UpdateCategoryModal open={updateModalOpen} onClose={() => setUpdateModalOpen(false)} category={selectedCategory} id={selectedCategory?._id} onUpdate={handleUpdateCategory} />

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
        <MenuItem onClick={() => { onEdit(id); handleClose(); }}>   <EditIcon  style={{ 
      marginRight: 8,
      color: 'blue' 
    }}/>Edit</MenuItem>
        <MenuItem onClick={() => { onToggleStatus(id); handleClose(); }}>
       <AutorenewIcon
    style={{ 
      marginRight: 8,
      color: currentStatus ? 'red' : 'green' 
    }}
  />
  {currentStatus ? 'Deactivate' : 'Activate'}
</MenuItem>
      </Menu>
    </>
  );
};

export default DataTable;
