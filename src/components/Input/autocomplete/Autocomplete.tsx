// AsyncAutocomplete.tsx
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

interface Film {
  title: string;
  year: number;
}

interface AsyncAutocompleteProps {
  label: string;
  options: Film[];
}

const sleep = (duration: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

const AsyncAutocomplete: React.FC<AsyncAutocompleteProps> = ({ label, options }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [filteredOptions, setFilteredOptions] = React.useState<readonly Film[]>([]);

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(1000); // Simulate network delay
      setLoading(false);
      setFilteredOptions(options);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setFilteredOptions([]);
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={filteredOptions}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AsyncAutocomplete;
