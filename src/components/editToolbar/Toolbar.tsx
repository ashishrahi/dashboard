import * as React from 'react';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { GridRowModesModel } from '@mui/x-data-grid';

interface EditToolbarProps {
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Category
      </Button>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default EditToolbar;
