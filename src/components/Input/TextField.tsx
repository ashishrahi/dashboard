import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// Define a custom styled component
const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: '#333',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  '& .MuiInputLabel-root': {
    color: '#555',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: '#1976d2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
});

const MyCustomTextField = ({ label, ...props }) => {
  return <CustomTextField label={label} {...props} />;
};

export default MyCustomTextField;
